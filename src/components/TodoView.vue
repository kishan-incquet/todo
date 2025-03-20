<template>
    <div>
        <div class="header">
            <h1>TO DO</h1>
            <button v-on:click="logout">Log Out</button>
        </div>

        <div id="root">
            <addInput></addInput>
            <div class="todos">
                <h3>Pending Task</h3>
                <div class="pending-task" v-if="pendingTodos.length > 0">
                    <Todo v-bind:todo="todo" v-for="todo in pendingTodos" v-bind:key="todo.id"></Todo>
                </div>
                <div class="error" v-else>No Pending Task </div>
                <div class="completed-task" v-if="completedTodos.length > 0">
                    <h3>Completed Task</h3>
                    <Todo v-bind:todo="todo" class="completed" v-for="todo in completedTodos" v-bind:key="todo.id">
                    </Todo>
                </div>

            </div>
        </div>
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
        ...mapState(useTodoStore, ["completedTodos", "pendingTodos"])
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
.header {
    display: grid;
    grid-template-columns: 10fr .5fr;
}

.header button {
    width: max-content;
    height: max-content;
    align-self: center;
    padding: .5rem 2rem;
    background-color: #41cac3;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    text-transform: uppercase;
}

h1 {
    text-align: center;
    margin-top: 1rem;
}

#root {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-inline: auto;
    border: 2px solid black;
    width: max-content;
    padding: 1rem;
    border-radius: 10px;
}

.todos {
    border: 2px solid black;
    border-radius: 10px;
    width: 31rem;
    margin-top: 1rem;
    padding-inline: 1rem;
}

.error {
    text-align: center;
    padding: .5rem 1rem;
    border-radius: 10px;
    color: rgba(220, 17, 17, 0.896);
    margin-bottom: 1rem;
}

.completed .name {
    text-decoration: line-through;
}
</style>