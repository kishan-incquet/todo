<template>
    <div class="todo-container">
        <input type="checkbox" name="status" class="todoStatus" value="1" v-bind:disabled="isEdit"
            v-bind:checked="todo.status" v-on:change="changeStatus">
        <input type="text" class="name" v-model="name" v-on:keydown="checkDone" v-bind:disabled="!isEdit">
        <div class="btns" v-show="!isEdit">
            <button v-on:click="editTask" v-if="todo.status != 1">
                <svg fill="#3ea552" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                    viewBox="0 0 32 32">
                    <path
                        d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z">
                    </path>
                </svg>
            </button>
            <button v-on:click="deleteTask">
                <svg fill="#e23f3f" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                    viewBox="0 0 48 48">
                    <path
                        d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z">
                    </path>
                </svg>
            </button>
        </div>
        <div class="edit-btns" v-show="isEdit">
            <button v-on:click="reject">
                <svg fill="#e23f3f" width="20px" height="20px" viewBox="0 0 32 32" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>cancel2</title>
                        <path
                            d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z">
                        </path>
                    </g>
                </svg>
            </button>
            <button v-on:click="change">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                    <g fill="#3ea552" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <g transform="scale(5.12,5.12)">
                            <path
                                d="M41.9375,8.625c-0.66406,0.02344 -1.27344,0.375 -1.625,0.9375l-18.8125,28.78125l-12.1875,-10.53125c-0.52344,-0.54297 -1.30859,-0.74609 -2.03125,-0.51953c-0.71875,0.22266 -1.25391,0.83203 -1.37891,1.57422c-0.125,0.74609 0.17578,1.49609 0.78516,1.94531l13.9375,12.0625c0.4375,0.37109 1.01563,0.53516 1.58203,0.45313c0.57031,-0.08594 1.07422,-0.41016 1.38672,-0.89062l20.09375,-30.6875c0.42969,-0.62891 0.46484,-1.44141 0.09375,-2.10547c-0.37109,-0.66016 -1.08594,-1.05469 -1.84375,-1.01953z">
                            </path>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
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
        }
    },
    methods: {
        checkDone: function (event) {
            if (event.key == "Enter") {
                this.change();
            }
        },

        editTask: function () {
            this.isEdit = true;
        },

        changeStatus: function () {
            this.$emit("changeStatus", this.todo.id);
        },

        deleteTask: function () {
            this.$emit("delete", this.todo.id)
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

            this.$emit("changeTodo", { "id": this.todo.id, "name": this.name.trim(), "status": false })
            this.isEdit = false;
        }
    },
}
</script>
<style scoped>
.todo-container {
    display: grid;
    grid-template-columns: .5fr 3fr .5fr;
    width: 100%;
    margin-block: 1rem;
}

.todoStatus {
    cursor: pointer;
}

.todoStatus:disabled {
    visibility: hidden;
}

.name {
    width: 95%;
    border: none;
    margin-right: 1rem;
    border-bottom: 1px solid black;
    background-color: transparent;
    color: black;
}

.name:disabled {
    border: none;
    color: black;
}

.completed .name {
    color: green;
}

.btns,
.edit-btns {
    display: flex;
    justify-content: flex-end;
    gap: .5rem;
}

button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}
</style>