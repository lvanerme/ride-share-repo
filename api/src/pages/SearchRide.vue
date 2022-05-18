<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="purple" dark flat>
            <v-toolbar-title>Search for a ride</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
<<<<<<< HEAD
                v-model="rideQuery.name"
                label="Name of location"
                type="text"
=======
                  v-model="rideQuery.name"
                  label="Name of location"
                  type="text"
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
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
<<<<<<< HEAD
                class="elevation-1"
                v-bind:headers="headers"
                v-bind:items="rides"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.date }}</td>
=======
                  class="elevation-1"
                  v-bind:headers="headers"
                  v-bind:items="rides"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.date.slice(0,10) }}</td>
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
                    <td>{{ item.time }}</td>
                    <td>{{ item.distance }}</td>
                    <td>{{ item.fuelPrice }}</td>
                    <td>{{ item.fee }}</td>
                  </tr>
                </template>
              </v-data-table>

            </v-form>

          </v-card-text>
<<<<<<< HEAD
          
=======

>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
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
<<<<<<< HEAD

=======
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
      rideQuery: {
        name:"",
        address:"",
        city:"",
        state:"",
        zipCode:""
      },

<<<<<<< HEAD
      
=======
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
      headers: [
        { text: "Date", value: "date" },
        { text: "Time", value: "time" },
        { text: "Distance", value: "distance" },
        { text: "Fuel Price", value: "fuelPrice" },
        { text: "Fee", value: "fee" }
      ],
<<<<<<< HEAD

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
=======
      rides: [],
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312

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
<<<<<<< HEAD

    search: function() {
      // this.querySuccesful = false;

      this.$axios.get("/view-search-ride", {
=======
    search: function() {
      // this.querySuccesful = false;
      this.$axios.get("/search-ride", {
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
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
<<<<<<< HEAD
            date: ride.date,
            time: ride.time,
            distance: ride.distance,
            fuelPrice: ride.fuelPrice,
            fee: ride.fee,
        }))
        console.log(this.rides)
        
    })
      // .catch((err) => this.showDialog("Failed", err)); 
    },

    // showDialog: function (header) {
    //     this.dialogHeader = header;
    //     this.dialogVisible = true;
    // },

    // hideDialog: function () {
    //     this.dialogVisible = false;
    //     },

    // goToViewRides(){
    //   this.$router.push({name:"view-search-ride"
      
    //   , params: {
    //     name: this.rideQuery.name,
    //     address: this.rideQuery.address,
    //     city: this.rideQuery.city,
    //     state: this.rideQuery.state,
    //     zipCode: this.rideQuery.zipCode
    //   }})
    // },


  }

=======
          date: ride.date,
          time: ride.time,
          distance: ride.distance,
          fuelPrice: ride.fuelPrice,
          fee: ride.fee,
        }))
        console.log(this.rides)

      })
      // .catch((err) => this.showDialog("Failed", err));
    },
  }
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
}
</script>

<style scoped>
</style>