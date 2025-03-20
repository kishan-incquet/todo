<template>
    <div class="add-container">
        <input type="text" v-model="todoName" v-on:keypress="checkDone" placeholder="Add Task">
        <button v-on:click="addTodo(todoName)">+</button>
    </div>
</template>
<script>
import useTodoStore from '@/store/todoStore';
import { mapActions } from 'pinia';

export default {
    name: "addInput",
    data() {
        return {
            todoName: ""
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

<style scoped>
.add-container {
    border: 2px solid black;
    display: flex;
    width: max-content;
    border-radius: 10px;
    padding: .2rem .5rem .2rem .5rem;
}

input {
    border: none;
    outline: none;
    width: 30rem;
}

button {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: bold;
}
</style>