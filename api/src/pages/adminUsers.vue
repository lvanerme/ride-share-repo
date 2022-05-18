<!-- TODO:: isAdmin doesn't display the boolean. Maybe convert the bool to a
  string or something. Maybe just not even have that column -->

<template>
  <v-container>
    <div>
      <h4 class="display-1">Admin Vehicles Page</h4>
      <v-card-actions>
      </v-card-actions>
      <v-data-table
          class="elevation-1"
          v-bind:headers="headers"
          v-bind:items="users"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.password }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.isAdmin }}</td>
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
  name: "adminUsers",

  data: function(){
    return {
      headers:[
        { text: "First Name", value: "firstName"},
        { text: "Last Name", value: "lastName"},
        { text: "Email", value: "email"},
        { text: "Password", value: "password"},
        { text: "Phone", value: "phone"},
        { text: "Admin Status", value: "isAdmin" },
        { text: "Actions", value: "action" }
      ],
      users: [],

      snackbar:{
        show: false,
        text: ""
      }
    };
  },

  mounted: function() {
      this.$axios.get("/admin-Users", { 
        params: {
        isAdmin: this.$store.state.isAdmin
        }
      }).then(response => {
        this.users = response.data.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          phone: user.phone,
          isAdmin: user.licenseState,
        }));
      }).catch(err => console.log(err))
  },


}
</script>

<style scoped>

</style>