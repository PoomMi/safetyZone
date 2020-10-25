<template>
  <b-container fluid="md" class="py-5" v-if="load">
    <b-overlay :show="data_loading" no-wrap> </b-overlay>
    <b-card header-tag="header" class="shadow">
      <template v-slot:header>
        <b-row>
          <b-col>
            <div class="mb-0 card-title">{{ type }} Safety Zone</div>
          </b-col>
        </b-row>
      </template>

      <div class="content" v-if="!data_loading">
        <b-row class="mt-2 ml-1">
          <b-col cols="4" class="sf-title">ID</b-col>
          <b-col class="sf-title">Name</b-col>
        </b-row>
        <div v-for="(item, key) in data" :key="(item, key)">
          <b-row class="mt-1">
            <b-col cols="10">
              <nuxt-link
                class="nav-link nav-item btn-back"
                :to="'/safety-zone/' + item.sf_id"
                v-b-tooltip.hover.bottom
                :title="item.name"
              >
                <b-row>
                  <b-col cols="5" class="ml-1">{{ item.sf_id }}</b-col>
                  <b-col class="">{{ item.name }}</b-col>
                </b-row>
              </nuxt-link>
            </b-col>
            <b-col cols="2">
              <button
                type="button"
                class="btn btn-danger btn-remove"
                v-b-tooltip.hover.bottom
                title="remove this safet zone"
                @click="sf_remove(item.sf_id, item.name)"
              >
                Remove
              </button>
            </b-col>
          </b-row>
          <hr />
        </div>
      </div>
    </b-card>
  </b-container>
</template>


<script>
import axios from "axios";

export default {
  layout: "nav-bar",

  data() {
    return {
      load: false,
      type: "",
      data: [],
      data_loading: true,
    };
  },

  mounted() {
    if (this.$cookies.get("uid") == null) {
      alert("Invalid access!, try to login.");
      window.location = "/";
    } else {
      this.load = true;
    }

    this.initial()
      .then((res) => {
        this.type = res;
      })
      .then(() => {
        this.getData();
      })
      .catch((err) => console.error(err));
  },
  methods: {
    initial() {
      return new Promise((resolve, reject) => {
        try {
          this.$fireDb
            .ref(`admin/${this.$cookies.get("uid")}/type`)
            .once("value")
            .then((res) => {
              resolve(res.val());
            });
        } catch (err) {
          reject(new Error(err));
        }
      });
    },
    getData() {
      this.$fireDb
        .ref("safetyZone/userAdded")
        .orderByChild("type")
        .equalTo(this.type)
        .once("value")
        .then((res) => {
          if (res.val() != null) {
            for (let index in res.val()) {
              if (res.val()[index] != null) this.data.push(res.val()[index]);
            }
          }else{
            alert("data is empty")
          }
        })
        .then(() => {
          this.data_loading = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async sf_remove(sf_id, sf_name) {
      let amount;
      let owner_id;
      let index_onUserAdded;
      let index_onSFOwner;

      this.$bvModal
        .msgBoxConfirm(`Are you sure to remove  ${sf_name}`, {
          title: "Please Confirm",
          okVariant: "danger",
          okTitle: "confirm",
          cancelTitle: "cancel",
        })
        .then(async (value) => {
          if (value) {
            this.data_loading = true;

            await axios
              .get(
                `https://safety-zone-c1ae5.firebaseio.com/safetyZone/sf_user_info/${sf_id}/index_onSFOwner.json`
              )
              .then(async (res) => {
                index_onSFOwner = res.data;
              });

            await axios
              .get(
                `https://safety-zone-c1ae5.firebaseio.com/safetyZone/sf_user_info/${sf_id}/index_onUserAdded.json`
              )
              .then(async (res) => {
                index_onUserAdded = res.data;
              });

            await axios
              .get(
                `https://safety-zone-c1ae5.firebaseio.com/safetyZone/userAdded/${index_onUserAdded}/owner.json`
              )
              .then(async (res) => {
                owner_id = res.data;
              });

            const data_sf = this.$fireDb.ref(
              `safetyZone/sf_user_info/${sf_id}`
            );

            const data_userAdded = this.$fireDb.ref(
              `safetyZone/userAdded/${index_onUserAdded}`
            );

            const data_owner = this.$fireDb.ref(
              `sf_owner/${owner_id}/${index_onSFOwner}`
            );

            const amountOnDB = this.$fireDb.ref("safetyZone/amount");

            await amountOnDB
              .once("value")
              .then((data) => {
                //set safety zone id
                amount = data.val();
                amount = amount - 1;
              })
              .catch((err) => console.error(err));

            await data_sf.remove().catch((err) => console.error(err));

            await data_userAdded.remove().catch((err) => console.error(err));

            await data_owner.remove().catch((err) => console.error(err));

            await amountOnDB.set(amount); //update amount

            this.data_loading = false;
            alert(sf_name + " is removed");

            window.location = "/safety-zone-admin";
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
.card-body {
  max-height: 60vh;
  height: 60vh;
  overflow: auto;
}
/* scrollbar */
/* width */
::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}
/* Track */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #82b1ff;
}
.sf_content {
  text-overflow: ellipsis;
}
.sf_add {
  display: inline;
  cursor: pointer;
}
.sf_add:hover {
  transform: scale(1.1);
}
.card-title {
  font-size: 1.5rem;
}
.sf-title {
  font-weight: bolder;
}
a:link {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
hr {
  width: 98%;
  margin-left: 1.5%;
  margin-top: 1.5%;
  background-color: rgba(0, 0, 0, 0.2);
}
.btn-remove {
  float: right;
}
</style>
