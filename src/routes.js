import VueRouter from "vue-router";
import Login from "./components/Login.vue";
import TodoView from "./components/TodoView.vue";
import { auth } from "./firebase.config";

const Routes = [
    { path: "/login", component: Login },
    {
        path: "/",
        component: TodoView,
        meta: { requiresAuth: true }
    }
];

const router = new VueRouter({
    routes: Routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                next();
            } else {
                next("/login");
            }
        });
    }
    else {
        next();
    }
});


export default router;