<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicle Types Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="vehicles"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>
            
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
        { text: "Type", value: "type"},
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
      this.$axios.get("/admin-Vehicle-Type", { 
        params: {
          isAdmin: this.$store.state.isAdmin
        }
      }).then(response => {
        this.vehicles = response.data.map(vehicle => ({
          type: vehicle.type,
        }));
      }).catch(err => console.log(err))
  },


}
</script>

<style scoped>

</style>