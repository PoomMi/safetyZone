<template>
  <div v-if="load">
    <b-navbar class="nav" toggleable="md">
      <b-navbar-brand>
        <nuxt-link class="nav-link nav-item brand" to="/"
          >Safety Zone Searching</nuxt-link
        >
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- map menu -->
          <nuxt-link class="nav-link nav-item map" to="/">
            <b-icon icon="map" class="map-icon"></b-icon> MAP
          </nuxt-link>

          <!-- before authen -->
          <b-button
            squared
            class="btn-auth"
            variant="outline-primary"
            v-if="!auth"
            @click="signin"
          >
            <b-icon icon="person-circle"></b-icon> Sign In
          </b-button>
          <!-- after authen -->
          <b-nav-item-dropdown
            right
            :text="$cookies.get('uname')"
            class="dropdown"
            menu-class="w-100"
            v-else
          >
            <b-dropdown-item to="/my-safety-zone"
              >My safety zone</b-dropdown-item
            >
            <b-dropdown-item v-if="admin" to="/safety-zone-admin"
              >In responsibility</b-dropdown-item
            >
            <b-dropdown-item @click="signout" to="/">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: false,
      load: false,
      admin: false,
    };
  },

  created() {
    if (this.$cookies.get("uid") != null) {
      this.auth = true;
    }
    this.load = true;
  },

  mounted() {
    if (this.auth) {
      this.isAdmin();
    }
  },

  methods: {
    signin() {
      let provider = new this.$fireAuthObj.GoogleAuthProvider();
      this.$fireAuth
        .signInWithPopup(provider)
        .then((res) => {
          this.auth = true;
          this.$cookies.set("uid", res.user.uid);
          this.$cookies.set("uname", res.user.displayName);
        })
        .then(() => {
          this.isAdmin();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    signout() {
      this.$fireAuth
        .signOut()
        .then(() => {
          this.$cookies.removeAll();
          this.auth = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    isAdmin() {
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
    },
  },
};
</script>

<style scoped>
.brand {
  color: white !important;
  font-weight: bold;
}
.nav {
  background-color: #81d4fa;
  z-index: 30;
}
.navbar-light .navbar-nav .nav-link {
  color: white;
}
.dropdown {
  border-radius: 0;
  border: 1px solid #007bff;
  background-color: #007bff;
}
.map {
  transform: translate(-10%, 0);
}
@media only screen and (max-width: 768px) {
  .navbar-light .navbar-nav .nav-link {
    display: flex;
    justify-content: center;
  }
  .map {
    transform: translate(0, 0);
  }
  .map-icon {
    transform: translate(-20%, 0);
  }
}
</style>
