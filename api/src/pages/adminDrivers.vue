<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicle Types Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="drivers"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.licenseNumber }}</td>
            <td>{{ item.licenseState }}</td>

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
  name: "adminDrivers",
  data: function(){
    return {
      headers:[
        { text: "License Number", value: "licenseNumber"},
        { text: "State", value: "licenseState"},
        { text: "Actions", value: "action" }
      ],
      drivers: [],
      snackbar:{
        show: false,
        text: ""
      }
    };
  },
  mounted: function() {
    this.$axios.get("/admin-Drivers", {
      params: {
        isAdmin: this.$store.state.isAdmin
      }
    }).then(response => {
      this.drivers = response.data.map(driver => ({
        licenseNumber: driver.licenseNumber,
        licenseState: driver.licenseState
      }));
    }).catch(err => console.log(err))
  },
}
</script>

<style scoped>
</style>