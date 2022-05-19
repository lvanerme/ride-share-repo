<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicle Types Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="vehicles"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>

            <td>
              <v-icon small @click="cancelRide(item)">
                mdi-cancel
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <br>

      <h4 class="display-0">Create New Vehicle Type</h4>
      <v-form v-model="valid">
        <v-text-field
            v-model="newVehicleType.type"
            label="Type"
        />
      </v-form>
      <v-btn v-on:click="handleSubmit"
      >Create
      </v-btn>

      <v-snackbar v-model="snackbar.show">
        {{ snackbar.text }}
        <v-btn color="blue" text @click="snackbar.show = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "adminVehicles",
  data: function(){
    return {
      headers:[
        { text: "Type", value: "type"},
        { text: "Actions", value: "action" }
      ],
      vehicles: [],
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
      newVehicleType:{
        type: "",
      },
      snackbar:{
        show: false,
        text: ""
      }
    };
  },
  mounted: function() {
    this.$axios.get("/admin-Vehicle-Type", {
      params: {
        isAdmin: this.$store.state.isAdmin
      }
    }).then(response => {
      this.vehicles = response.data.map(vehicle => ({
        type: vehicle.type,
      }));
    }).catch(err => console.log(err))
  },
  methods: {
    // Invoked when the user clicks the 'Sign Up' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.vehicleTypeCreated = false;
      // Post the content of the form to the Hapi server.
      this.$axios
          .post("/admin-Vehicle-Type", {
            type: this.newVehicleType.type,
          })
          .then((result) => {
            // Based on whether things worked or not, show the
            // appropriate dialog.
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.vehicleTypeCreated = true;
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          })
          .catch((err) => this.showDialog("Failed", err));
    },
    // Helper method to display the dialog box with the appropriate content.
    showDialog: function (header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },
    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function () {
      this.dialogVisible = false;
      if (this.vehicleCreated) {

        this.$router.push({ name: "admin-Vehicles" });
      }
    },
  },
}
</script>

<style scoped>
</style>