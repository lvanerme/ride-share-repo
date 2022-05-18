<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicles Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="locations"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.state }}</td>
            <td>{{ item.zipCode }}</td>
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
  name: "adminLocations",

  data: function(){
    return {
      headers:[
        { text: "Name", value: "name"},
        { text: "address", value: "address"},
        { text: "city", value: "city"},
        { text: "state", value: "state"},
        { text: "zipCode", value: "zipCode"},
        { text: "Actions", value: "action" }
      ],
      locations: [],

      snackbar:{
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
      this.$axios.get("/admin-Locations", { 
        params: {
        isAdmin: this.$store.state.isAdmin
        }
      }).then(response => {
        this.locations = response.data.map(location => ({
          name: location.name,
          address: location.address,
          city: location.city,
          state: location.state,
          zipCode: location.zipCode,
          
        }));
      }).catch(err => console.log(err))
  },


}
</script>

<style scoped>

</style>