<template>
  <div>
    <h1> TO DO</h1>
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
  </div>
</template>

<script>
import addInput from "./components/Input.vue";
import todoView from "./components/Todos.vue";

export default {
  name: 'App',
  components: {
    "addInput": addInput,
    "Todo": todoView
  },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    addTodo: function (todoName) {
      this.todos.push({
        id: Date.now(),
        todoName: todoName,
        status: false
      });
    },
    updateTodo: function (updates) {
      let newTodo = this.todos.find((todo) => todo.id == updates.id);
      newTodo.todoName = updates.name;
    },
    changeStatus: function (id) {
      let newTodo = this.todos.find((todo) => todo.id == id);
      newTodo.status = !newTodo.status;
    },
    deleteTodo: function (id) {
      this.todos = this.todos.filter((todo) => todo.id != id);
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
  }
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
