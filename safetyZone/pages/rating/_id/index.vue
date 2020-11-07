<template>
  <b-container fluid="md" class="py-3">
    <b-overlay :show="loading" no-wrap class="loading"></b-overlay>

    <div class="header mt-5">{{ sf_name }}</div>
    <div class="sub-header mb-5">SAFETY ZONE RATING</div>

    <b-form @submit="onSubmit" v-if="show_form" class="pb-5">
      <div v-for="(value, name) in form.rating" :key="(value, name)">
        <div class="topic">
          <div class="topic-head">
            <label class="mr-2">{{ name }}</label>
            <b-form-invalid-feedback :state="validation(form.rating[name])">
              {{ name }} is 1-5 only.
            </b-form-invalid-feedback>
          </div>
          <div class="topic-description">({{ description[name] }})</div>
        </div>

        <b-input-group class="mb-3">
          <b-form-rating
            v-model="form.rating[name]"
            :variant="color[name]"
          ></b-form-rating>
          <b-input-group-append>
            <b-input-group-text
              class="justify-content-center"
              style="min-width: 3em"
            >
              {{ value }}
            </b-input-group-text>
          </b-input-group-append>
          <b-input-group-prepend>
            <b-button @click="form.rating[name] = 0">Clear</b-button>
          </b-input-group-prepend>
        </b-input-group>
      </div>

      <b-row class="d-flex align-items-center">
        <b-col cols="auto">
          <label class="mt-2"
            >Is the number of air purifiers suitable for the room size?</label
          ></b-col
        >
        <b-col>
          <b-form-invalid-feedback :state="validation(form.air_suitable)">
            ( option must be selected. )
          </b-form-invalid-feedback></b-col
        >
      </b-row>
      <div class="d-flex">
        <b-form-radio v-model="form.air_suitable" value="Yes" class="mr-2"
          >Yes</b-form-radio
        >
        <b-form-radio v-model="form.air_suitable" value="No">No</b-form-radio>
      </div>

      <b-row class="d-flex align-items-center">
        <b-col cols="auto"
          ><label class="mt-2">Are air purifiers activated?</label></b-col
        >
        <b-col>
          <b-form-invalid-feedback :state="validation(form.air_activated)">
            ( option must be selected. )
          </b-form-invalid-feedback></b-col
        >
      </b-row>
      <div class="d-flex">
        <b-form-radio v-model="form.air_activated" value="Yes" class="mr-2"
          >Yes</b-form-radio
        >
        <b-form-radio v-model="form.air_activated" value="No">No</b-form-radio>
      </div>

      <b-row class="d-flex align-items-center">
        <b-col cols="auto"
          ><label class="mt-2">Is the place closed?</label></b-col
        >
        <b-col>
          <b-form-invalid-feedback :state="validation(form.place_closed)">
            ( option must be selected. )
          </b-form-invalid-feedback></b-col
        >
      </b-row>
      <div class="d-flex">
        <b-form-radio v-model="form.place_closed" value="Yes" class="mr-2"
          >Yes</b-form-radio
        >
        <b-form-radio v-model="form.place_closed" value="No">No</b-form-radio>
      </div>

      <b-form-group
        id="input-group-comment"
        label="Comment:"
        label-for="comment"
        class="mt-4"
      >
        <b-form-textarea
          id="comment"
          v-model="form.comment"
          placeholder="Enter your comment"
          rows="4"
        ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" class="float-right mt-2"
        >Submit</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
export default {
  layout: "nav-bar",

  data() {
    return {
      form: {
        comment: "",
        air_activated: "",
        air_suitable: "",
        place_closed: "",

        rating: {
          Cleaning: 0,
          Visit: 0,
          Safety: 0,
        },
      },

      color: {
        Cleaning: "warning",
        Visit: "success",
        Safety: "primary",
      },

      description: {
        Cleaning: "Is the place clean?",
        Visit: "Is the visit convenient?",
        Safety: "Do you feel safe from dust?",
      },
      sf_id: "",
      sf_name: "",
      loading: true,
      show_form: false,
    };
  },
  created() {
    this.loading = true;
    this.sf_id = this.$route.params.id;

    this.$fireDb
      .ref(`safetyZone/sf_user_info/${this.sf_id}/name`)
      .once("value")
      .then((res) => {
        if (res.val() == null) {
          alert("This safety zone is not exist");
        } else {
          alert(
            "Please make sure you are already signed in before start rating."
          );
          this.sf_name = res.val();
          this.show_form = true;
        }

        this.loading = false;
      });
  },

  methods: {
    reset() {
      // Reset our form values
      this.form.rating.Cleaning = 0;
      this.form.rating.Visit = 0;
      this.form.rating.Safety = 0;
      this.form.comment = "";
      this.form.air_activated = "";
      this.form.air_suitable = "";
      this.form.place_closed = "";
    },

    async onSubmit(evt) {
      evt.preventDefault();
      if (this.$cookies.get("uid") == null) {
        alert("Please sign in first.");
      } else {
        this.loading = true;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        await this.$fireDb
          .ref('rating/list_year')
          .once("value")
          .then((res) => {
            if (res.val()[res.val().length - 1] < year) {
              this.$fireDb.ref(`rating/list_year/${res.val().length}`).set(year)
            }
          });

        await this.$fireDb
          .ref(
            `rating/${this.sf_id}/${year}/${month}/${day}/${this.$cookies.get(
              "uid"
            )}`
          )
          .set({
            Cleaning: this.form.rating.Cleaning,
            Visit: this.form.rating.Visit,
            Safety: this.form.rating.Safety,
            Comment: this.form.comment,
            air_activated: this.form.air_activated,
            air_suitable: this.form.air_suitable,
            place_closed: this.form.place_closed,
          })
          .then(() => {
            alert("rate success");
            this.reset();
            this.loading = false;
          });
      }
    },

    validation(value) {
      return value != 0 || value != "";
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 2rem;
}
.sub-header {
  text-align: center;
  font-size: 1.5rem;
}
#btn-submit {
  float: right;
}
#comment {
  resize: none;
}
.topic-head {
  display: flex;
}
.topic-description {
  font-size: 0.8rem;
}
.loading {
  position: fixed !important;
}
</style>