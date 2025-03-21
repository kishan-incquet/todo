<template>
    <v-list-item class="d-flex pa-0 ma-0 justify-center">
        <v-checkbox v-bind:disabled="isEdit" v-model="status"
            v-on:change="changeStatus({ id: todo.id, updatedStatus: !todo.status })" color="green"></v-checkbox>
        <v-text-field class="ma-0 mx-2 border-0" v-model="name" v-on:keydown="checkDone"
            v-bind:disabled="!isEdit"></v-text-field>

        <div class="btns" v-show="!isEdit">
            <v-icon color="teal darken-2" v-on:click="editTask" v-if="!todo.status">mdi-pencil</v-icon>
            <v-icon color="teal darken-2" v-on:click="deleteTodo(todo.id)">mdi-delete</v-icon>
        </div>

        <div class="edit-btns d-flex" v-if="isEdit">
            <v-icon color="teal darken-2" v-on:click="reject">mdi-close</v-icon>
            <v-icon color="teal darken-2" v-on:click="change">mdi-check</v-icon>
        </div>
    </v-list-item>
</template>

<script>
import useTodoStore from '@/store/todoStore';
import { mapActions } from 'pinia';

export default {
    name: "todoView",

    props: {
        todo: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            name: this.todo.todoName,
            isEdit: false,
            status: this.todo.status
        }
    },

    methods: {

        ...mapActions(useTodoStore, ["updateTodo", "changeStatus", "deleteTodo"]),

        checkDone: function (event) {
            if (event.key == "Enter") {
                this.change();
            }
        },

        editTask: function () {
            this.isEdit = true;
        },


        reject: function () {
            this.name = this.todo.todoName;
            this.isEdit = false;
        },

        change: function () {
            if (this.name.trim() == "") {
                alert("Please Enter a Task Title")
                return;
            }

            this.updateTodo({ "id": this.todo.id, "name": this.name.trim(), "status": false });
            this.isEdit = false;
        }

    },

}
</script>
