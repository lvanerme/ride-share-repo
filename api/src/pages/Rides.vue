<template>
  <v-container>
    <div>
      <h4 class="display-1">Rides</h4>

      <instructions details="Look up all the rides" />

      <v-form v-if="!querySuccesful" v-model="valid">
        <v-text-field
            v-model="rideQuery.name"
            
            label="Name"
        ></v-text-field>
        <v-text-field
            v-model="rideQuery.address"
            label="Address"
        ></v-text-field>
        <v-text-field
            v-model="rideQuery.city"
            label="City"
        >
        </v-text-field>
        <v-text-field
            v-model="rideQuery.state"
            v-bind:rules="rules.state"
            label="State"
        >
        </v-text-field>
        <v-text-field
            v-model="rideQuery.zipCode"
            v-bind:rules="rules.zipCode"
            label="Zip Code"
        ></v-text-field>
        <v-btn v-bind:disabled="!valid" v-on:click="handleSubmit"
        >Search
        </v-btn>
      </v-form>

      <div class="text-xs-center">
        <v-dialog v-model="dialogVisible" width="500">
          <v-card>
            <v-card-title primary-title>
              {{ dialogHeader }}
            </v-card-title>

            <v-card-text>
              {{ dialogText }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text v-on:click="hideDialog">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

        <v-data-table v-if="querySuccesful"
        class="elevation-1"
        v-bind:headers="headers"
        v-bind:items="accounts"
      >
        <template v-slot:item="{ item }">
          <tr v-bind:class="itemClass(item)">
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.zipCode }}</td>
          </tr>
        </template>
      </v-data-table>

    </div>
  </v-container>
</template>

<script>
import Instructions from "../components/Instructions.vue";

export default {
  name: "RidePage",
  components: {
    Instructions, // Use the Instructions component we just imported
  },
  data: function () {
    return {
      valid: false, // Are all the fields in the form valid?

      // Object to collect account data
      rideQuery: {
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
      },

      // Was an account created successfully?
      querySuccesful: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "State", value: "state" },
        { text: "Zip Code", value: "zipCode" }
      ],
      rides: [],
      // Data to be displayed by the dialog.
      dialogHeader: "<no dialogHeader>",
      dialogVisible: false,

      // Validation rules for the form fields. This functionality is an extension
      // that's part of the Vuetify package. Each rule is a list of functions
      // (note the fat arrows). Vuetify invokes all functions in the list,
      // passing it the content of the associated form field. Functions should
      // return either true (the field passes that validation) or a string
      // containing an error message indicating why the field doesn't pass validation.
      rules: {
        required: [(val) => val.length > 0 || "Required"],
        state: [
          (val) => /([A-Z]{2})?/.test(val) || "Need 2 upper case letter",
        ],
        zipCode: [
            (val) => /(\d{5})?/.test(val) || "Need 5 digits",
        ],
      },
    };

    },

    methods: {
        // Invoked when the user clicks the 'Sign Up' button.
        handleSubmit: function () {
        // Haven't been successful yet.
        this.querySuccesful = false;


        // Post the content of the form to the Hapi server.
        this.$axios
            .get("/rides", {
                name: this.rideQuery.name,
                address: this.rideQuery.address,
                city: this.rideQuery.city,
                state: this.rideQuery.state,
                zipCode: this.rideQuery.zipCode
            })
            .then((result) => {
                this.rides = result.data.map(ride => ({
                    name: ride.name,
                    address: ride.address,
                    city: ride.city,
                    state: ride.state,
                    zipCode: ride.zipCode
                }))

                // Based on whether things worked or not, show the
                // appropriate dialog.
                if (result.data.ok) {
                this.showDialog("Success");
                this.querySuccesful = true;
                } else {
                this.showDialog("Sorry");
                }
            })
            .catch((err) => this.showDialog("Failed", err));
        },

        // Helper method to display the dialog box with the appropriate content.
        showDialog: function (header) {
        this.dialogHeader = header;
        this.dialogVisible = true;
        },

        // Invoked by the "Okay" button on the dialog; dismiss the dialog
        // and navigate to the home page.
        hideDialog: function () {
        this.dialogVisible = false;
        // if (this.accountCreated) {
        //     // Only navigate away from the sign-up page if we were successful.
        //     this.$router.push({ name: "home-page" });
        // }
        },
    },
    };
</script>