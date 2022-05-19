<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="20">
        <v-card class="elevation-12">
          <v-toolbar color="purple" dark flat>
            <v-toolbar-title>Search for a ride</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  v-model="rideQuery.name"
                  label="Name of location"
                  type="text"
              />
              <v-text-field
                  v-model="rideQuery.address"
                  label="Address"
              />
              <v-text-field
                  v-model="rideQuery.city"
                  label="City"
              />
              <v-text-field
                  v-model="rideQuery.state"
                  label="State"
              />
              <v-text-field
                  v-model="rideQuery.zipCode"
                  label="Zip Code"
              />
            </v-form>
            <v-card-actions>
              <v-spacer />
              <v-btn v-on:click="search" color="purple" class="white--text">Search</v-btn>
              <!-- <v-btn v-on:click="goToViewRides()" color="purple" class="white--text">TESTING</v-btn> -->
            </v-card-actions>

            <v-form>
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
                  </tr>
                </template>
              </v-data-table>

            </v-form>

          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid:false,
      rideQuery: {
        name:"",
        address:"",
        city:"",
        state:"",
        zipCode:""
      },

      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" },
        { text: "From Location", value: "fromLocationId" },
        { text: "To Location", value: "toLocationId" }
      ],
      rides: [],

      rules: {
        required: [(val) => val.length > 0 || "Required"],
        state: [
          (val) => /([A-Z]{2})?/.test(val) || "Need 2 upper case letter",
        ],
        zipCode: [
          (val) => /(\d{5})?/.test(val) || "Need 5 digits",
        ],
      },
      snackbar: {
        show: false,
        msge: "",
      },
    };
  },
  methods: {
    search: function() {

      this.$axios.get("/search-ride", {
        params: {
          name: this.rideQuery.name,
          address: this.rideQuery.address,
          city: this.rideQuery.city,
          state: this.rideQuery.state,
          zipCode: this.rideQuery.zipCode
        }
      }).then(response => {
        console.log(response.data)
        this.rides = response.data.map(ride => ({
          date: ride.date,
          time: ride.time,
          distance: ride.distance,
          fuelPrice: ride.fuelPrice,
          fee: ride.fee,
          toLocationId: ride.toLocationId,
          fromLocationId: ride.fromLocationId
        }))
        console.log(this.rides)

      })
      // .catch((err) => this.showDialog("Failed", err));
    },
  }
}
</script>

<style scoped>
</style>