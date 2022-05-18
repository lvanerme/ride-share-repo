<template>
  <v-container>
    <div>
      <h1 class="text-center">These are the rides you are searching for</h1>


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
          </tr>
        </template>
      </v-data-table>


    </div>
  </v-container>
</template>

<script>
export default {
    name: "ViewSearchRide",


    data(){
        return {
            headers: [
                { text: "Date", value: "date" },
                { text: "Time", value: "time" },
                { text: "Distance", value: "distance" },
                { text: "FuelPrice", value: "fuelPrice" },
                { text: "Fee", value: "fee" }
            ],
            rides: [],

            // snackbar: {
            //     show:false,
            //     text: ""
            // },

            mounted: function() {
                this.$axios.get("/view-search-ride").then(response => {
                    this.rides = response.data.map(ride => ({
                        date: ride.date,
                        time: ride.time,
                        distance: ride.distance,
                        fuelPrice: ride.fuelPrice,
                        fee: ride.fee
                    }))
                })
            }
        }
    },
  
}
</script>

<style scoped>

</style>