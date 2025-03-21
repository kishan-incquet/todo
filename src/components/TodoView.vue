<template>
    <div class="d-flex flex-column pt-0 ma-5 pr-5">
        <v-btn v-on:click="logout" class="align-self-end">Log Out</v-btn>
        <v-card outlined class="mx-auto mt-5 pa-3 d-flex flex-column rounded-lg border" width="50rem">
            <v-card-title class="justify-center" width="100%" tag="h1">TO DO</v-card-title>

            <v-card-text>
                <addInput></addInput>
                <v-sheet class="rounded-lg border pt-2 pb-2">
                    <v-card elevation="0" v-if="!loading" class="mt-1 px-3 overflow-auto" max-height="60vh">
                        <h3 class="orange--text">Pending Task</h3>
                        <v-list class="pa-0 ma-0" v-if="pendingTodos.length > 0">
                            <Todo v-bind:todo="todo" v-for="todo in pendingTodos" v-bind:key="todo.id"></Todo>
                        </v-list>

                        <v-alert text color="red" class="text-center" light v-else>
                            No Pending Task
                        </v-alert>

                        <v-list class="pa-0 ma-0" v-if="completedTodos.length > 0">
                            <h3 class="orange--text">Completed Task</h3>
                            <Todo v-bind:todo="todo" v-for="todo in completedTodos" v-bind:key="todo.id">
                            </Todo>
                        </v-list>
                    </v-card>
                </v-sheet>

                <v-skeleton-loader v-if="loading" type="list-item-avatar,list-item-avatar" class="mx-auto my-6"
                    max-width="100%"></v-skeleton-loader>
            </v-card-text>
        </v-card>
    </div>
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

<style>
.border {
    border: 1px solid black;
    border-color: black !important;
}
</style>