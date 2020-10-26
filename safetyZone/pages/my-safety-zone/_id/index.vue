<template>
  <b-container fluid="md" class="py-5">
    <b-overlay :show="overlay" no-wrap> </b-overlay>
    <div id="content" v-if="data_exist">
      <div v-if="load">
        <div class="btn">
          <b-button variant="danger" class="ml-2" @click="deleteClicked"
            >Delete</b-button
          >
          <b-button variant="primary" @click="editClicked">Edite</b-button
          ><br />
          <b-button
            variant="info"
            @click="qr_code = !qr_code"
            class="mt-2 btn-qr"
            v-b-tooltip.hover
            title="Get QR code for rating"
            >Get QR code</b-button
          >
        </div>

        <mySF :data="data" />
      </div>

      <mySF_edit
        v-if="edit"
        :data="data"
        @edited="editAction"
        @editLoadFinished="editLoadFinished"
        @cancel="editCancel"
      />
    </div>
    <div v-if="!data_exist" class="no-data">
      No data
      <nuxt-link class="nav-link nav-item btn-back" to="/">
        <b-button block variant="primary">Back</b-button>
      </nuxt-link>
    </div>

    <b-modal v-model="qr_code" hide-footer title="Safety Zone QR Code">
      <div>Print this QR code to allow customer rate this safety zone.</div>
      <center>
        <qrcode-vue
          :value="`http://localhost:3000/rating/${sf_id}`"
          level="H"
          size="300"
          class="qr-code"
        ></qrcode-vue>
      </center>

      <div id="aaa"></div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";
import mySF from "@/components/my-sf";
import mySF_edit from "@/components/my-sf-edit";
import QrcodeVue from "qrcode.vue";

export default {
  layout: "nav-bar",

  components: { mySF, mySF_edit, QrcodeVue },

  data() {
    return {
      overlay: true,
      load: false,
      data_exist: true,
      data: "",
      edit: false,
      sf_id: "",
      index_onUserAdded: "",
      index_onSFOwner: "",
      user_id: "",
      qr_code: false,
    };
  },
  mounted() {
    if (this.$cookies.get("uid") == null) {
      alert("Invalid access!, try to login.");
      window.location = "/";
    } else {
      this.load = true;
    }
  },
  created() {
    this.user_id = this.$cookies.get("uid");
    this.sf_id = this.$route.params.id;
    this.$fireDb
      .ref(`safetyZone/sf_user_info/${this.sf_id}`)
      .once("value")
      .then(async (res) => {
        if (res.val() == null) this.data_exist = false;
        else {
          this.data = await res.val();
          this.data_exist = true;
          this.data.sf_id = this.sf_id;
        }
      })
      .then(() => {
        this.load = true;
        this.overlay = false;
      })
      .catch((err) => console.error(err));
  },

  methods: {
    editClicked() {
      this.load = false;
      this.edit = true;
      this.overlay = true;
    },
    async deleteClicked() {
      let amount;
      this.$bvModal
        .msgBoxConfirm(`Are you sure to remove  ${this.data.name}`, {
          title: "Please Confirm",
          okVariant: "danger",
          okTitle: "confirm",
          cancelTitle: "cancel",
        })
        .then(async (value) => {
          if (value) {
            this.overlay = true;

            let u_id = this.$cookies.get("uid");

            const data_sf = this.$fireDb.ref(
              `safetyZone/sf_user_info/${this.sf_id}`
            );

            const data_userAdded = this.$fireDb.ref(
              `safetyZone/userAdded/${this.data.index_onUserAdded}`
            );

            const data_owner = this.$fireDb.ref(
              `sf_owner/${u_id}/${this.data.index_onSFOwner}`
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

            this.overlay = false;
            alert(this.data.name + " is removed");

            window.location = "/my-safety-zone";
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editLoadFinished() {
      this.overlay = false;
    },
    editAction() {
      this.edit = false;
      this.load = true;
    },
    editCancel() {
      this.edit = false;
      this.load = true;
    },
  },
};
</script>

<style scoped>
.btn {
  float: right;
}
.btn-qr {
  width: 100%;
}
.qr-code {
  margin-top: 5%;
}
canvas {
  width: 70%;
}
</style>