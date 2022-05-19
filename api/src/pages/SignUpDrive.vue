<template>
    <v-container>
      <div>
        <h4 class="display-1">Sign up to drive on any of these rides!</h4>
        <v-card-actions>
        </v-card-actions>
        <v-data-table
            class="elevation-1"
            v-bind:headers="headers"
            v-bind:items="rides"
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
                <v-btn color="orange" text @click="signUpToDrive(item)">
                  Sign up
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>

        <v-snackbar v-model="snackbar.show">
          {{ snackbar.msge }}
          <v-btn color="blue" text @click="snackbar.show = false">
            Close
          </v-btn>
        </v-snackbar>
      </div>
    </v-container>
</template>

<script>
export default {
  name: "SignUpDrive",
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
    this.$axios.get("/sign-up-drive", { params: {
        currentAccount: this.$store.state.currentAccount.email
      }
    }).then(response => {
      if (!response.data.ok){
        this.showSnackbar(response.data.msge)
      }
      this.rides = response.data.rides.map(ride => ({
        id: ride.id,
        date: ride.date,
        time: ride.time,
        distance: ride.distance,
        fuelPrice: ride.fuelPrice,
        toLocationId: ride.toLocationId,
        fromLocationId: ride.fromLocationId,
        fee: ride.fee,
      }));
    })
  },

  methods: {
    signUpToDrive(item) {
      this.$axios.post(`/sign-up-driveBtn/${item.id}/${this.$store.state.currentAccount.email}`)
          .then(response => {
            if(response.data.ok) {
              this.showSnackbar(response.data.msge)
            } else {
              this.showSnackbar(response.data.msge)
            }
          })
    },

    showSnackbar(msge) {
      this.snackbar.msge = msge;
      this.snackbar.show = true;
    },

  }
}
</script>

<style scoped>

</style>