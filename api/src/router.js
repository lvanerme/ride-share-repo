
import Vue from "vue";
import Router from "vue-router";

//add pages here

import Home from "./pages/Home.vue"
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        { name: "home-page", path: "/", component: Home },
        { name: "sign-up", path: "/sign-up", component: SignUp },
        { name: "sign-in", path: "/sign-in", component: SignIn },

    ]
});