import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import TodoView from "./components/TodoView.vue";

export default [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
        path: "/", component: TodoView
        ,
        meta: {
            requiresAuth: true
        }
    }



]



