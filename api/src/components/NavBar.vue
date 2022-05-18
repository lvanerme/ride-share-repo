<template>
  <v-app-bar app dark color="purple">
    <router-link v-bind:to="{ name: 'home-page' }">
      <v-toolbar-title class="white--text">
        Ride Share
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn v-if="!isLoggedIn" text v-bind:to="{ name: 'sign-up' }">
      Sign Up
    </v-btn>
    <v-btn v-if="!isLoggedIn" text v-bind:to="{ name: 'sign-in' }">
      Sign In
    </v-btn>

    <v-menu v-if="isLoggedIn && isAdmin" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark>mdi-account</v-icon>
          <span>Admin</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'admin-Vehicles' }">
          <v-list-item-title>Vehicles</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Vehicle-Type' }">
          <v-list-item-title>Vehicle Type</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Locations' }">
          <v-list-item-title>Locations</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Users' }">
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Rides' }">
          <v-list-item-title>Rides</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Drivers' }">
          <v-list-item-title>Drivers</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'admin-Passengers' }">
          <v-list-item-title>Passengers</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>

    <v-btn v-if="isLoggedIn" text v-bind:to="{ name: 'view-your-rides' }">
      View your rides
    </v-btn>

    <v-menu v-if="isLoggedIn" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark></v-icon>
          <span>Rides</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'search-ride' }">
          <v-list-item-title>Search For Rides</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'sign-up-ride' }">
          <v-list-item-title>Sign Up For Rides</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>

    <v-menu v-if="isLoggedIn" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark></v-icon>
          <span> Drivers </span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'become-driver' }">
          <v-list-item-title>Register as a Driver</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'sign-up-drive' }">
          <v-list-item-title>Sign up to Drive </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-bind:to="{ name: 'view-driving-rides' }">
          <v-list-item-title> View Rides You are Driving </v-list-item-title>
        </v-list-item>

      </v-list>
    </v-menu>


    <v-menu v-if="isLoggedIn" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon dark>mdi-account</v-icon>
          <span>{{ $store.state.currentAccount.firstName }}</span>
          <v-icon dark>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-bind:to="{ name: 'accounts' }">
          <v-list-item-title>Accounts</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="signOut">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>


  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },

  methods: {
    signOut() {
      this.$store.commit("logOut");
      this.$store.commit("resetAdmin");
      if (this.$router.currentRoute.name != "home-page") {
        this.$router.push({name: "home-page"});
      }
    }
  }
};


</script>