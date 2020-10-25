<template>
  <b-container fluid="md" class="py-5" v-if="load">
    <b-overlay :show="data_loading" no-wrap> </b-overlay>
    <b-card header-tag="header" class="shadow">
      <template v-slot:header>
        <b-row>
          <b-col>
            <div class="mb-0 card-title">My Safety Zone</div>
          </b-col>
          <b-col>
            <nuxt-link
              class="nav-link nav-item"
              to="/safety-zone-registeration"
            >
              <b-icon
                icon="plus-circle-fill"
                class="float-right rounded-circle sf_add text-primary"
                font-scale="2"
                v-b-tooltip.hover.bottom
                title="Add safet zone"
              ></b-icon>
            </nuxt-link>
          </b-col>
        </b-row>
      </template>

      <div class="content" v-if="!data_loading">
        <b-row class="mt-2 ml-1">
          <b-col cols="4" class="sf-title">ID</b-col>
          <b-col class="sf-title">Name</b-col>
        </b-row>
        <div v-for="(item,key) in data" :key="(item,key)">
          <nuxt-link
            class="nav-link nav-item btn-back ml-1"
            :to="'/my-safety-zone/' + item.sf_id"
            v-b-tooltip.hover.bottom
            :title="item.name"
          >
            <b-row class="mt-1">
              <b-col cols="4">{{ item.sf_id }}</b-col>
              <b-col class="ml-1">{{ item.name }}</b-col>
            </b-row>
          </nuxt-link>
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

    this.$fireDb
      .ref(`sf_owner/${this.$cookies.get("uid")}`)
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
};
</script>

<style scoped>
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
  width: 96%;
  margin-left: 1.5%;
  margin-top: 1.5%;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
