<template>
    <v-container>
      <div>
        <h4 class="display-1">These are the rides you are a driver for</h4>
        <v-card-actions>
        </v-card-actions>
        <v-data-table
            class="elevation-1"
            v-bind:headers="headers"
            v-bind:items="drives"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.date.slice(0,10) }}</td>
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
  name: "ViewDrivingRides",

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
      drives: [],

      snackbar:{
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
    this.$axios.get("/view-driving-rides", { params: {
        currentAccount: this.$store.state.currentAccount.email
      }
    }).then(response => {
      this.drives = response.data.map(drive => ({
        id: drive.id,
        date: drive.date,
        time: drive.time,
        distance: drive.distance,
        fuelPrice: drive.fuelPrice,
        toLocationId: drive.toLocationId,
        fromLocationId: drive.fromLocationId,
        fee: drive.fee,
      }));
    })
  },

  methods: {
    showSnackbar(msge) {
      this.snackbar.msge = msge;
      this.snackbar.show = true;
    },

    cancelRide(item){
      this.$axios.delete(`/unrelate-drivingRides/${item.id}`).then(response => {
        if(response.data.ok){
          this.drives = this.drives.filter(
              drive => drive.id !== item.id
          );
        }
      });
    }
  },
}
</script>

<style scoped>

</style>