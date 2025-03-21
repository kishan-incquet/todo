import { auth, db } from "@/firebase.config";
import { defineStore } from "pinia";

const useTodoStore = defineStore("TodoStore", {

  state: () => ({
    todos: [],
    user: auth.currentUser,
    loading: true,
  }),

  getters: {

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

  actions: {

    loadTodos() {
      db.collection("Todo").where("uid", "==", this.user.uid).onSnapshot((snapshot) => {
        this.todos = [];

        snapshot.docs.forEach(doc => {
          this.todos.push({
            ...doc.data(), id: doc.id
          })
        });
        this.loading = false;
      });

    },

    addTodo(todoName) {
      if (todoName.trim() == "") {
        alert("Please Enter a Task Title")
        return;
      }
      this.adding = true;

      db.collection("Todo").add({
        "todoName": todoName,
        "status": false,
        "uid": this.user.uid
      }).then(() => {
        console.log("Task Created!");
        setTimeout(function () { this.adding = false }, 1000)
      }).catch((error) => {
        alert("Error Adding: ", error);
      });

    },

    updateTodo(updates) {
      if (updates.name.trim() == "") {
        alert("Please Enter a Task Title")
        return;
      }

      db.collection("Todo").doc(updates.id).update({
        todoName: updates.name,
      }).then(() => {
        console.log("Task Updated!");
      }).catch((error) => {
        console.error("Error Updating: ", error);
      });
    },

    changeStatus({ id, updatedStatus }) {
      db.collection("Todo").doc(id).update({
        status: updatedStatus
      }).then(() => {
        console.log("Status Changed!");
      }).catch((error) => {
        console.error("Error Changing Status: ", error);
      });
    },

    deleteTodo(id) {
      db.collection("Todo").doc(id).delete().then(() => {
        console.log("Task Deleted!");
      }).catch((error) => {
        console.error("Error Deleting: ", error);
      });
    },

  }

});

export default useTodoStore;