<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Rides Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="rides"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.date }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.distance }}</td>
            <td>{{ item.fuelPrice }}</td>
            <td>{{ item.fee }}</td>
            <td>{{ item.toLocationId }}</td>
            <td>{{ item.fromLocationId }}</td>
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
  name: "adminRides",

  data: function(){
    return {
      headers:[
        { text: "Date", value: "date"},
        { text: "Time", value: "time"},
        { text: "Distance", value: "distance"},
        { text: "FuelPrice", value: "fuelPrice"},
        { text: "Fee", value: "fee"},
        { text: "From Location", value: "fromLocationId" },
        { text: "To Location", value: "toLocationId" },
        { text: "Actions", value: "action" }
      ],
      rides: [],

      snackbar:{
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
      this.$axios.get("/admin-Rides", { params: {
        isAdmin: this.$store.state.isAdmin
        }
      }).then(response => {
        this.rides = response.data.map(ride => ({
          id: ride.id,
          date: ride.date,
          time: ride.time,
          distance: ride.distance,
          fuelPrice: ride.fuelPrice,
          toLocationId: ride.toLocationId,
          fromLocationId: ride.fromLocationId,
          fee: ride.fee,
        }));
      }).catch(err => console.log(err))
  },


}
</script>

<style scoped>

</style>