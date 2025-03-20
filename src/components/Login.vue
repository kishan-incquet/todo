<template>
    <div class="container" id="login-section">
        <h2>Login</h2>
        <input type="email" id="username" placeholder="Email" v-model="uEmail" />
        <input type="password" id="password" placeholder="Password" v-model="uPass" />
        <button id="login-btn" v-on:click="registerUser()">Login</button>
        <p>Don't have an account? <RouterLink to="/register">Register Here</RouterLink>
        </p>
        <p id="login-error-message" class="error-message"></p>
    </div>
</template>


<script>
import { auth } from "../firebase.config";
export default {
    "name": "MyLogin",
    props: {
        "name": {
            type: String
        }
    },
    data() {
        return {
            uEmail: "",
            uPass: "",
        }
    },
    methods: {
        registerUser: function () {
            auth.signInWithEmailAndPassword(this.uEmail, this.uPass)
                .then(() => {
                    this.$router.push("/");
                })
                .catch((error) => {
                    var errorMessage = (error.message);
                    console.log(errorMessage);
                });
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    width: 100%;
    margin: 5rem auto;
    max-width: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 20px;
    color: #5e5e5e;
}

input,
textarea {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
}

input:focus,
textarea:focus {
    border-color: #41cac3;
    outline: none;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #41cac3;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    margin-block: 10px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #41cac3;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

#error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 10px;
}

#login-section,
#register-section,
#note-section {
    display: block;
}

textarea {
    min-height: 200px;
    resize: vertical;
}

#note-section h2 {
    font-size: 1.6rem;
    margin-bottom: 15px;
    color: #333;
}

#note-section button {
    background-color: #f44336;
}

#note-section button:hover {
    background-color: #e53935;
}
</style>