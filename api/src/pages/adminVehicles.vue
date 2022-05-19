<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicles Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="vehicles"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.make }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.color }}</td>
            <td>{{ item.vehicleTypeId }}</td>
            <td>{{ item.capacity }}</td>
            <td>{{ item.mpg }}</td>
            <td>{{ item.licenseState }}</td>
            <td>{{ item.licensePlate }}</td>
            <td>
              <v-icon small @click="cancelRide(item)">
                mdi-cancel
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
      <br>
      <h4 class="display-0">Create New Vehicle</h4>
      <v-form v-model="valid">
        <v-text-field
            v-model="newVehicle.make"
            label="Make"
            type="text"
        />
        <v-text-field
            v-model="newVehicle.model"
            label="Model"
        />
        <v-text-field
            v-model="newVehicle.color"
            label="Color"
        />
        <v-text-field
            v-model="newVehicle.vehicleTypeId"
            label="Type"
        />
        <v-text-field
            v-model="newVehicle.capacity"
            label="Capacity"
        />
        <v-text-field
            v-model="newVehicle.mpg"
            label="MPG"
        />
        <v-text-field
            v-model="newVehicle.licenseState"
            label="State"
        />
        <v-text-field
            v-model="newVehicle.liscensePlate"
            label="License Plate"
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
      valid: false,
      headers:[
        { text: "Make", value: "make" },
        { text: "Model", value: "model" },
        { text: "Color", value: "color" },
        { text: "Type", value: "vehicleTypeId" },
        { text: "Capacity", value: "capacity"},
        { text: "MPG", value: "mpg"},
        { text: "State", value: "licenseState" },
        { text: "License Plate", value: "liscensePlate" },
        { text: "Actions", value: "action" }
      ],
      vehicles: [],
      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
      newVehicle:{
        make: "",
        model: "",
        color: "",
        typeId: "",
        capacity: "",
        mpg: "",
        licenseState: "",
        licensePlate: "",
      },
      snackbar:{
        show: false,
        text: ""
      }
    };
  },
  mounted: function() {
    this.$axios.get("/admin-Vehicles", {
      params: {
        isAdmin: this.$store.state.isAdmin
      }
    }).then(response => {
      this.vehicles = response.data.map(vehicle => ({
        make: vehicle.make,
        model: vehicle.model,
        color: vehicle.color,
        vehicleTypeId: vehicle.vehicleTypeId,
        capacity: vehicle.capacity,
        mpg: vehicle.mpg,
        licenseState: vehicle.licenseState,
        liscensePlate: vehicle.liscensePlate,
      }));
    }).catch(err => console.log(err))
  },
  methods: {
    // Invoked when the user clicks the 'Sign Up' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.vehicleCreated = false;
      // Post the content of the form to the Hapi server.
      this.$axios
          .post("/admin-Vehicles", {
            make: this.newVehicle.make,
            model: this.newVehicle.model,
            color: this.newVehicle.color,
            vehicleTypeId: this.newVehicle.vehicleTypeId,
            capacity: this.newVehicle.capacity,
            mpg: this.newVehicle.mpg,
            licenseState: this.newVehicle.licenseState,
            liscensePlate: this.newVehicle.liscensePlate,
          })
          .then((result) => {
            // Based on whether things worked or not, show the
            // appropriate dialog.
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.vehicleCreated = true;
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