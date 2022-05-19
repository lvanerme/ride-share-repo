<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="purple" dark flat>
            <v-toolbar-title>Log in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="UserEmail"
                  label="User Email"
                  name="UserEmail"
                  type="text"
              />
              <v-text-field
                  v-model="LicensePlate"
                  label="License Plate"
                  name="LicensePlate"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn v-on:click="authorize" color="purple" class="white--text">Authorize</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show">
      {{ snackbar.msge }}
      <v-btn text color="primary" @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      UserEmail: "",
      LicensePlate: "",

      snackbar: {
        show: false,
        text: "",
      },
    };
  },

  methods: {
    authorize() {
      this.$axios
          .post("/admin-authorize-vehicle", {
            UserEmail: this.UserEmail,
            LicensePlate: this.LicensePlate,
          })
          .then((result) => {
            this.showSnackbar(result.data.msge);
          })
          .catch((err) => this.showSnackbar(err));
    },

    showSnackbar(msge) {
      this.snackbar.msge = msge;
      this.snackbar.show = true;
    },
  },
};
</script>

<style scoped>

</style>