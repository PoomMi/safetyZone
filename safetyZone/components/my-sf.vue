<template>
  <b-container fluid="md" class="py-5">
    <div id="name"><b>Name: </b>{{ data.name }}</div>
    <div id="type"><b>Type: </b>{{ data.type }}</div>
    <div id="owner"><b>Owner: </b>{{ data.owner }}</div>
    <div id="owner_CID"><b>Owner_CID: </b>{{ data.owner_CID }}</div>
    <div id="address"><b>Address: </b>{{ data.address }}</div>
    <div id="tel"><b>Tel: </b>{{ data.tel }}</div>
    <div id="email"><b>Email: </b>{{ data.email }}</div>
    <div id="line"><b>Line: </b>{{ data.line }}</div>
    <div id="facebook"><b>Facebook: </b>{{ data.facebook }}</div>
    <div id="air_con"><b>Air condition: </b>{{ data.air_con }}</div>
    <div id="air_pur"><b>Air purifier: </b>{{ data.air_pur }}</div>
    <div id="overnight"><b>Overnight: </b>{{ data.overnight }}</div>
    <div id="room"><b>Room: </b>{{ data.room }}</div>
    <img id="cover_url" :src="data.cover_url" />
    <img id="inside1_url" :src="data.inside1_url" />
    <img id="inside2_url" :src="data.inside2_url" />
    <img id="inside3_url" :src="data.inside3_url" />
  </b-container>
</template>

<script>
export default {
  layout: "nav-bar",
  props: ["data"],
};
</script>

<style scoped>
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