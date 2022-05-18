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
        { text: "Make", value: "make"},
        { text: "Model", value: "model"},
        { text: "Color", value: "color"},
        { text: "Capacity", value: "capacity"},
        { text: "MPG", value: "mpg"},
        { text: "State", value: "licenseState" },
        { text: "License Plate", value: "licensePlate" },
        { text: "Actions", value: "action" }
      ],
      vehicles: [],

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
          capacity: vehicle.capacity,
          mpg: vehicle.mpg,
          licenseState: vehicle.licenseState,
          licensePlate: vehicle.liscensePlate,
          fee: vehicle.fee,
        }));
      }).catch(err => console.log(err))
  },


}
</script>

<style scoped>

</style>