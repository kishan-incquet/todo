<template>
    <div>
        <h1>TO DO</h1>
        <div id="root">
            <addInput v-on:add="addTodo"></addInput>
            <div class="todos">
                <h3>Pending Task</h3>
                <div class="pending-task" v-if="pendingTodos.length > 0">
                    <Todo v-bind:todo="todo" v-on:delete="deleteTodo" v-on:changeStatus="changeStatus"
                        v-on:changeTodo="updateTodo" v-for="todo in pendingTodos" v-bind:key="todo.id"></Todo>
                </div>
                <div class="error" v-else>No Pending Task </div>
                <div class="completed-task" v-if="completedTodos.length > 0">
                    <h3>Completed Task</h3>
                    <Todo v-bind:todo="todo" class="completed" v-on:delete="deleteTodo" v-on:changeStatus="changeStatus"
                        v-on:changeTodo="updateTodo" v-for="todo in completedTodos" v-bind:key="todo.id"></Todo>
                </div>

            </div>
        </div>
        <button v-on:click="logout">Log Out</button>
    </div>
</template>

<script>
import addInput from "./Input.vue";
import todoView from "./Todos.vue";
import { db, auth } from "../firebase.config.js";

export default {
    name: 'TodoView',
    components: {
        "addInput": addInput,
        "Todo": todoView,
    },
    data() {
        return {
            todos: [],
            user: null
        }
    },
    methods: {
        addTodo: async function (todoName) {
            db.collection("Todo").add({
                "todoName": todoName,
                "status": false,
                "uid": this.user.uid
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                alert("Error writing document: ", error);
            });
        },

        updateTodo: async function (updates) {
            db.collection("Todo").doc(updates.id).update({
                todoName: updates.name,
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        },

        changeStatus: function ({ id, updatedStatus }) {
            db.collection("Todo").doc(id).update({
                status: updatedStatus
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        },

        deleteTodo(id) {
            db.collection("Todo").doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        },

        logout: function () {
            auth.signOut().then(() => {
                console.log("Log out...");
            }).catch(() => {
                console.error("Something Went Wrong......");
            })
        }
    },

    computed: {
        pendingTodos: function () {
            return this.todos.filter((todo) => {
                if (!todo.status) {
                    return todo;
                }
            });
        },

        completedTodos: function () {
            return this.todos.filter((todo) => {
                if (todo.status) {
                    return todo;
                }
            });
        },
    },

    created: async function () {
        const user = auth.currentUser;
        this.user = user;

        db.collection("Todo").where("uid", "==", this.user.uid).onSnapshot((snapshot) => {
            this.todos = [];

            snapshot.docs.forEach(doc => {
                this.todos.push({
                    ...doc.data(), id: doc.id
                })
            });
        });
    },
}
</script>

<style>
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