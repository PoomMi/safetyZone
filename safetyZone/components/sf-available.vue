<template>
  <b-card class="useable">
    <div id="space"></div>
    <div id="used"></div>
  </b-card>
</template>

<script>
export default {
  mounted() {
    let sf_id = this.$route.params.id;

    this.$fireDb
      .ref(`safetyZone/available/${sf_id}`)
      .on("value", function (res) {
        let space = res.val().capacity - res.val().used;
        document.getElementById("used").innerHTML = `used: ${res.val().used}/${
          res.val().capacity
        }`;
        document.getElementById(
          "space"
        ).innerHTML = `<b>Availabe</b>: ${space}`;
      });
  },
};
</script>

<style scoped>
.useable {
  background-color: #d6d6d6;
  color: black;
  width: 15%;
  min-width: 160px;
}
.card-body {
  max-height: 11vh;
  overflow: auto;
}
</style>