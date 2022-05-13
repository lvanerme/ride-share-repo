<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="purple" dark flat>
            <v-toolbar-title>Register to be a Driver</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                  v-model="newDriver.email"
                  :rules = "rules.email"
                  label="Email"
                  name="name"
                  type="text"
              />
              <v-text-field
                v-model="newDriver.licenseNumber"
                label="license plate number"
                name="licenseNumber"
                type="text"
              />
              <v-text-field
                  v-model="newDriver.licenseState"
                  label="License state"
                  name="licenseState"
                  type="text"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!valid" v-on:click="becomeDriver" color="purple" class="white--text">Register as a Driver</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show">
      {{ snackbar.msge }}
      <v-btn text color="purple" @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,

      newDriver: {
        email: "",
        licenseNumber: "",
        licenseState: "",
      },

      rules: {
        email: [
          (val) => /\w{3,}@\w{3,}(?:.\w{3,})+$/.test(val) || "Invalid e-mail",
        ],
      },

      snackbar: {
        show: false,
        msge: "",
      },
    };
  },

  methods: {
    becomeDriver() {
      this.$axios
        .post("/become-driver", {
          email: this.email,
          licenseNumber: this.newDriver.licenseNumber,
          licenseState: this.newDriver.licenseState,
      })
      .then((result) => {
        this.showSnackbar(result.data.msge);
        if (result.data.ok) {
          this.$router.push({name: "home-page"});
        }
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