<template>
    <v-card outlined class="mx-auto mt-5 pa-3 d-flex flex-column" width="50rem">
        <v-btn v-on:click="logout" class="align-self-end">Log Out</v-btn>
        <h3>TO DO </h3>

        <addInput></addInput>
        <v-card outlined elevation="0" v-if="!loading" class="mt-5 pa-5">
            <h3>Pending Task</h3>
            <v-list class="pending-task" v-if="pendingTodos.length > 0">
                <Todo v-bind:todo="todo" v-for="todo in pendingTodos" v-bind:key="todo.id"></Todo>
            </v-list>

            <v-banner class="my-1 text-center red--text" v-else>No Pending Task</v-banner>

            <v-list class="completed-task" v-if="completedTodos.length > 0">
                <h3>Completed Task</h3>
                <Todo v-bind:todo="todo" v-for="todo in completedTodos" v-bind:key="todo.id">
                </Todo>
            </v-list>
        </v-card>

        <v-skeleton-loader v-if="loading" type="list-item-avatar" class="mx-auto my-6"
            max-width="100%"></v-skeleton-loader>
    </v-card>
</template>

<script>
import addInput from "./Input.vue";
import todoView from "./Todos.vue";
import { auth } from "../firebase.config.js";
import { mapState } from "pinia";
import useTodoStore from "@/store/todoStore";
import { mapActions } from "pinia";

export default {
    name: 'TodoView',

    components: {
        "addInput": addInput,
        "Todo": todoView,
    },

    computed: {
        ...mapState(useTodoStore, ["completedTodos", "pendingTodos", "loading"]),


    },

    methods: {
        ...mapActions(useTodoStore, ["loadTodos"]),

        logout: function () {
            auth.signOut().then(() => {
                console.log("Log out...");
            }).catch(() => {
                console.error("Something Went Wrong......");
            })
        }
    },

    created: async function () {
        this.loadTodos();
    },
}
</script>
