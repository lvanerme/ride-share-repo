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

      <br>
      <h4 class="display-0">Create New User</h4>
      <v-form v-model="valid">
        <v-text-field
            v-model="newUser.firstName"
            label="First Name"
            type="text"
        />
        <v-text-field
            v-model="newUser.lastName"
            label="Last Name"
        />
        <v-text-field
            v-model="newUser.email"
            label="Email"
        />
        <v-text-field
            v-model="newUser.password"
            label="Password"
        />
        <v-text-field
            v-model="newUser.phone"
            label="Phone Number"
        />
        <v-text-field
            v-model="newUser.isAdmin"
            label="Admin?"
        />
      </v-form>
      <v-btn v-on:click="handleSubmit"
      >Create
      </v-btn>

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
      userCreated: false,
      dialogHeader: "<no dialogHeader>",
      dialogText: "<no dialogText>",
      dialogVisible: false,
      newUser:{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        isAdmin: "",
      },
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
        isAdmin: user.isAdmin,
      }));
    }).catch(err => console.log(err))
  },
  methods: {
    // Invoked when the user clicks the 'Sign Up' button.
    handleSubmit: function () {
      // Haven't been successful yet.
      this.UserCreated = false;
      // Post the content of the form to the Hapi server.
      this.$axios
          .post("/admin-Users", {
            firstName: this.newUser.firstName,
            lastName: this.newUser.lastName,
            email: this.newUser.email,
            password: this.newUser.password,
            phone: this.newUser.phone,
            isAdmin: this.newUser.isAdmin,
          })
          .then((result) => {
            // Based on whether things worked or not, show the
            // appropriate dialog.
            if (result.data.ok) {
              this.showDialog("Success", result.data.msge);
              this.UserCreated = true;
            } else {
              this.showDialog("Sorry", result.data.msge);
            }
          })
          .catch((err) => this.showDialog("Failed", err));
    },
    // Helper method to display the dialog box with the appropriate content.
    showDialog: function (header, text) {
      this.dialogHeader = header;
      this.dialogText = text;
      this.dialogVisible = true;
    },
    // Invoked by the "Okay" button on the dialog; dismiss the dialog
    // and navigate to the home page.
    hideDialog: function () {
      this.dialogVisible = false;
      if (this.vehicleCreated) {

        this.$router.push({ name: "admin-Vehicles" });
      }
    },
  },
}
</script>

<style scoped>
</style>