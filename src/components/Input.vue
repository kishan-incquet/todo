<template>
    <v-card class="d-flex px-2" elevation="2" outlined width="100%">
        <!-- <input type="text" v-model="todoName" v-on:keypress="checkDone" placeholder="Add Task"> -->
        <v-text-field placeholder="Add Todo" v-model="todoName" v-on:keypress="checkDone"
            hide-details="auto"></v-text-field>
        <!-- <button v-on:click="addTodo(todoName)">+</button> -->
        <v-icon large color="teal darken-2">mdi-plus</v-icon>
    </v-card>
</template>
<script>
import useTodoStore from '@/store/todoStore';
import { mapActions } from 'pinia';

export default {
    name: "addInput",
    data() {
        return {
            todoName: "",

        }
    },
    methods: {
        ...mapActions(useTodoStore, ["addTodo"]),

        checkDone: function (event) {
            if (event.key == "Enter") {
                this.addTodo(this.todoName);
                this.todoName = "";
            }
        },
    }
}
</script>
