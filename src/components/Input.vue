<template>
    <v-text-field dense class="rounded-lg justify-center align-center" color="color" outlined placeholder="Add Todo"
        v-model="todoName" v-on:keydown.enter="storeTodo">

        <template v-slot:append>
            <v-btn icon class="mt-0 mb-2" v-on:click="storeTodo">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>
    </v-text-field>
</template>
<script>
import useTodoStore from '@/store/todoStore';
import { mapActions, mapState } from 'pinia';

export default {
    name: "addInput",
    data() {
        return {
            todoName: "",
        }
    },
    computed: {
        ...mapState(useTodoStore, ["adding"])
    },
    methods: {
        ...mapActions(useTodoStore, ["addTodo"]),

        storeTodo() {
            this.addTodo(this.todoName);
            this.todoName = "";
        }
    }
}
</script>
