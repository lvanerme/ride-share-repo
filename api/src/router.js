
import Vue from "vue";
import Router from "vue-router";

//add pages here

import Home from "./pages/Home.vue"
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import SearchRide from "./pages/SearchRide.vue";
import SignUpRide from "./pages/SignUpRide.vue"
import BecomeDriver from "./pages/BecomeDriver.vue";
import SignUpDrive from "./pages/SignUpDrive.vue";
import ViewDrivingRides from "./pages/ViewDrivingRides";
import ViewYourRides from "./pages/ViewYourRides";
import adminVehicles from "./pages/adminVehicles";
import adminVehicleType from "./pages/adminVehicleType";
import adminLocations from "./pages/adminLocations";
import adminUsers from "./pages/adminUsers";
import adminRides from "./pages/adminRides";
import adminDrivers from "./pages/adminDrivers";
import adminPassengers from "./pages/adminPassengers";


Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        { name: "home-page", path: "/", component: Home },
        { name: "sign-up", path: "/sign-up", component: SignUp },
        { name: "sign-in", path: "/sign-in", component: SignIn },
        { name: "search-ride", path: "/search-ride", component: SearchRide},
        { name: "sign-up-ride", path: "/sign-up-ride", component: SignUpRide },
        { name: "become-driver", path: "/become-driver", component: BecomeDriver},
        { name: "sign-up-drive", path: "/sign-up-drive", component: SignUpDrive},
        { name: "view-driving-rides", path: "/view-driving-rides", component: ViewDrivingRides},
        { name: "view-your-rides", path: "/view-your-rides", component: ViewYourRides},
        { name: "admin-Vehicles", path: "/admin-Vehicles", component: adminVehicles},
        { name: "admin-Vehicle-Type", path: "/admin-Vehicle-Type", component: adminVehicleType},
        { name: "admin-Locations", path: "/admin-Locations", component: adminLocations},
        { name: "admin-Users", path: "/admin-Users", component: adminUsers},
        { name: "admin-Rides", path: "/admin-Rides", component: adminRides},
        { name: "admin-Drivers", path: "/admin-Drivers", component: adminDrivers},
        { name: "admin-Passengers", path: "/admin-Passengers", component: adminPassengers},
    ]
});