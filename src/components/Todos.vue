<template>
    <v-list-item class="d-flex align-center pa-0 ma-0 justify-center">
        <v-list-item-action class="mr-1 ma-0">
            <v-checkbox color="orange" v-bind:disabled="isEdit" v-model="status"
                v-on:change="changeStatus({ id: todo.id, updatedStatus: !todo.status })"></v-checkbox>
        </v-list-item-action>

        <v-text-field dense loading class="mx-2 mt-3 my-0 border-none " v-model="name" v-on:keydown="checkDone"
            v-if="!todo.status" v-bind:readonly="!isEdit" color="green">
            <template v-slot:progress>
                <v-progress-linear value="0" class="my-0" v-bind:color="!isEdit ? '' : 'black'" absolute
                    height="2"></v-progress-linear>
            </template>
        </v-text-field>

        <span v-else class="d-block pl-3 text-decoration-line-through green--text" style="width: 85%;">
            {{ this.todo.todoName }}
        </span>

        <v-list-item-action class="ma-0">
            <div class="d-flex gap" v-if="!isEdit">
                <v-btn icon color="green" v-on:click="editTask">
                    <v-icon color="green" v-if="!todo.status">mdi-pencil</v-icon>
                </v-btn>

                <v-btn icon color="red" v-on:click="deleteTodo(todo.id)">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </div>

            <div class="d-flex gap" v-if="isEdit">
                <v-btn icon color="red" v-on:click="reject">
                    <v-icon color="red">mdi-close</v-icon>
                </v-btn>

                <v-btn icon color="green" v-on:click="change">
                    <v-icon color="green">mdi-check</v-icon>
                </v-btn>
            </div>

        </v-list-item-action>
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
<style>
.border-none {
    border: none !important;
}


.gap {
    gap: .7rem;
}
</style>