<template>
  <div>
    <b-card header-tag="header" class="mt-5 mb-3">
      <b-overlay :show="data_loading" no-wrap> </b-overlay>
      <template v-slot:header>
        <b-row class="header">
          <b-col sm="9" cols="12">
            <b-button
              pill
              id="rating-btn"
              @click="chang_color_btn('rating-btn', 'comment-btn')"
              >Rating</b-button
            >
            <b-button
              pill
              id="comment-btn"
              @click="chang_color_btn('comment-btn', 'rating-btn')"
              >Comments</b-button
            >
          </b-col>
          <b-col sm="3">
            <b-form-select
              class="select-year"
              v-model="selected_year"
              :options="list_year"
            ></b-form-select>
          </b-col>
        </b-row>
      </template>

      <b-row class="ml-2 mb-4"
        >{{ list_month[0] }} - {{ list_month[list_month.length - 1] }} (From
        {{ amount }} ratings.)</b-row
      >
      <div v-if="load_ratning">
        <b-row
          v-for="(value, key) in data"
          :key="(value, key)"
          class="my-2 align-items-center"
        >
          <b-col cols="12" sm="1"
            ><label class="ml-2 topic">{{ key }} </label></b-col
          >
          <b-col
            ><b-form-rating
              :value="value"
              inline
              readonly
              show-value
              class="score ml-2"
              :variant="color[key]"
            ></b-form-rating
          ></b-col>
        </b-row>

        <b-row v-if="admin" class="d-flex justify-content-center mt-4">
          <b-card
            class="my-3 mx-2"
            v-for="(value, key) in observe_data"
            :key="(value, key)"
          >
            <div>
              {{ text[key] }}
            </div>
            <div>
              <b>Yes: </b> {{ observe_data[key].yes }}<br />
              <b>No: </b> {{ observe_data[key].no }}
            </div>
          </b-card>
        </b-row>
      </div>

      <div v-if="load_comment">
        <b-card
          class="bg-secondary my-3"
          v-for="comment in comments"
          :key="comment"
        >
          <div class="text-light">
            {{ comment }}
          </div>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data_loading: true,
      load_ratning: false,
      load_comment: false,
      admin: false,
      sf_id: "",
      data: "",
      observe_data: "",
      amount: "",
      comments: "",
      list_year: [],
      selected_year: "",
      list_month: "",
      color: {
        Cleaning: "warning",
        Visit: "success",
        Safety: "primary",
      },
      text: {
        place_closed: "Is the place closed?",
        air_activated: "Are air purifiers activated?",
        air_suitable:
          "Is the number of air purifiers suitable for the room size?",
      },
    };
  },

  created() {
    this.sf_id = this.$route.params.id;
    this.selected_year = new Date().getFullYear();
    this.$fireDb
      .ref(`rating/list_year`)
      .once("value")
      .then((res) => {
        this.list_year = res.val();
      });
  },

  methods: {
    get_rating() {
      this.observe_data = {
        place_closed: { yes: 0, no: 0 },
        air_activated: { yes: 0, no: 0 },
        air_suitable: { yes: 0, no: 0 },
      };
      this.data_loading = true;
      this.comments = [];
      this.list_month = [];
      this.amount = 0;
      this.$fireDb
        .ref(`rating/${this.sf_id}/${this.selected_year}`)
        .once("value")
        .then((res) => {
          let data = {};

          for (let month in res.val()) {
            this.list_month.push(
              new Date(
                `${this.selected_year}-${month}-1`
              ).toLocaleString("en-us", { month: "long" })
            );
            data[month] = [];
            for (let day in res.val()[month])
              for (let user in res.val()[month][day]) {
                this.amount++;
                if (res.val()[month][day][user].Comment != "") {
                  this.comments.push(res.val()[month][day][user].Comment);
                }
                let data_month = {};
                data_month.Cleaning = res.val()[month][day][user].Cleaning;
                data_month.Safety = res.val()[month][day][user].Safety;
                data_month.Visit = res.val()[month][day][user].Visit;
                data[month].push(data_month);

                if (res.val()[month][day][user].air_activated === "Yes") {
                  this.observe_data.air_activated.yes++;
                } else {
                  this.observe_data.air_activated.no++;
                }

                if (res.val()[month][day][user].air_suitable === "Yes") {
                  this.observe_data.air_suitable.yes++;
                } else {
                  this.observe_data.air_suitable.no++;
                }

                if (res.val()[month][day][user].place_closed === "Yes") {
                  this.observe_data.place_closed.yes++;
                } else {
                  this.observe_data.place_closed.no++;
                }
              }
          }

          return data;
        })
        .then(async (data) => {
          let avg = {
            Cleaning: 0,
            Visit: 0,
            Safety: 0,
          };

          let all_weighted = await this.calculate_avg(data, avg);
          await this.calculate_wma(avg, all_weighted);

          return avg;
        })
        .then((data) => {
          data.Cleaning = data.Cleaning.toFixed(2);
          data.Safety = data.Safety.toFixed(2);
          data.Visit = data.Visit.toFixed(2);

          this.data = data;
          this.data_loading = false;
          this.chang_color_btn("rating-btn", "comment-btn");
        })
        .catch((err) => {
          console.error(err);
        });
    },

    calculate_avg(data, avg) {
      let weighted = 0;
      for (let month in data) {
        let avg_month = {
          Cleaning: 0,
          Visit: 0,
          Safety: 0,
        };

        data[month].forEach((el) => {
          avg_month.Cleaning += el.Cleaning;
          avg_month.Safety += el.Safety;
          avg_month.Visit += el.Visit;
        });
        avg_month.Cleaning /= data[month].length;
        avg_month.Safety /= data[month].length;
        avg_month.Visit /= data[month].length;

        weighted++;

        avg.Cleaning += avg_month.Cleaning * weighted;
        avg.Safety += avg_month.Safety * weighted;
        avg.Visit += avg_month.Visit * weighted;
      }

      return weighted;
    },

    async calculate_wma(avg, all_weighted) {
      let total_weighted = await this.calclate_totalWeighted(all_weighted);

      avg.Cleaning /= total_weighted;
      avg.Safety /= total_weighted;
      avg.Visit /= total_weighted;
    },

    calclate_totalWeighted(all_weighted) {
      let total = 0;
      for (let i = 1; i <= all_weighted; i++) {
        total += i;
      }
      return total;
    },

    chang_color_btn(focus_btn, aonther_btn) {
      document.getElementById(focus_btn).style.background = "#6c757d";
      document.getElementById(focus_btn).style.color = "white";

      document.getElementById(aonther_btn).style.background = "transparent";
      document.getElementById(aonther_btn).style.color = "#6c757d";

      if (focus_btn === "rating-btn") {
        this.load_ratning = true;
        this.load_comment = false;
      } else {
        this.load_comment = true;
        this.load_ratning = false;
      }
    },
  },

  watch: {
    selected_year: function () {
      this.get_rating();
      if (this.$cookies.get("uid") != null) {
        this.$fireDb
          .ref(`admin/${this.$cookies.get("uid")}`)
          .once("value")
          .then((res) => {
            if (res.val() != null) {
              this.admin = true;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.card-header {
  font-size: 1.3rem;
  background: #66b0ff;
}
.card-title {
  color: white;
}
.select-year {
  float: right;
}
.header {
  align-items: center;
}
.score {
  width: 100%;
}
.topic {
  font-weight: bold;
}

@media only screen and (max-width: 571px) {
  .select-year {
    margin-top: 3%;
  }
}
</style>