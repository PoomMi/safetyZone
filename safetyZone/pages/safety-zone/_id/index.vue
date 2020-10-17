<template>
  <b-container fluid="md" class="py-5">
    <b-overlay :show="!load" no-wrap> </b-overlay>
    <div id="content" v-if="data_exist">
      <spaceBox class="space-box" />
      <div id="name"><b>Name</b>: {{ data.name }}</div>
      <div id="type"><b>Type</b>: {{ data.type }}</div>
      <div id="owner"><b>Owner</b>: {{ data.owner }}</div>
      <div id="address"><b>Address</b>: {{ data.address }}</div>
      <div id="tel"><b>Tel.</b>: {{ data.tel }}</div>
      <div id="email"><b>Email</b>: {{ data.email }}</div>
      <div id="line"><b>Line</b>: {{ data.line }}</div>
      <div id="facebook"><b>Facebook</b>: {{ data.facebook }}</div>
      <div id="air_con"><b>Air_condition</b>: {{ data.air_con }}</div>
      <div id="air_pur"><b>Air purifire</b>: {{ data.air_pur }}</div>
      <div id="overnight"><b>Overnight</b>: {{ data.overnight }}</div>
      <div id="room"><b>Room</b>: {{ data.room }}</div>
      <img id="cover_url" :src="data.cover_url" />
      <img id="inside1_url" :src="data.inside1_url" />
      <img id="inside2_url" :src="data.inside2_url" />
      <img id="inside3_url" :src="data.inside3_url" />
    </div>
    <div v-if="!data_exist" class="no-data">
      No data
      <nuxt-link class="nav-link nav-item btn-back" to="/">
        <b-button block variant="primary">Back</b-button>
      </nuxt-link>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import spaceBox from "@/components/sf-available";

export default {
  layout: "nav-bar",

  components: { spaceBox },

  data() {
    return {
      load: "",
      data_exist: true,
      data: "",
    };
  },

  created() {
    let sf_id = this.$route.params.id;
    this.load = false;

    this.$fireDb
      .ref(`safetyZone/sf_user_info/${sf_id}`)
      .once("value")
      .then((res) => {
        if (res.val() == null) this.data_exist = false;
        else this.data = res.val();
      })
      .then(() => {
        this.load = true;
      });
  },
};
</script>

<style scoped>
.title {
  font-weight: bold;
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: rgb(105, 104, 104);
  font-size: 3rem;
}
img {
  width: 22%;
}
.space-box {
  float: right;
}

@media only screen and (max-width: 541px) {
  img {
    width: 70%;
    margin-bottom: 5px;
  }
  .space-box {
    float: left;
    margin-right: 100%;
  }
}
</style>