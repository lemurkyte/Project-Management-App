<template>
  <div class="template">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Sign In</h3>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-user"></i
                    ></span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="email"
                    v-model="email"
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"
                      ><i class="fas fa-key"></i
                    ></span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    v-model="password"
                  />
                </div>
                <div class="row align-items-center remember">
                  <input type="checkbox" />Remember Me
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="login"
                    class="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-center links">
                  Need an account?
                  <router-link to="/register">Sign Up</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => console.log(data))
        .catch((err) => alert(err.message));
    };

    return { login, email, password };
  },
};
</script>

<style lang="scss" scoped>

.template {
  background-color: #202125;
  height: 100vh;
}

.container {
  height: 100%;
  align-content: center;
  background-color: #202125;
}

.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: #383838 !important;
  color: #a3afb7;
}

.input-group-prepend span {
  width: 50px;
  background-color: #F75901;
  color: #202125;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #F75901;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}

.card-footer {
  margin-top: 15%;
}
</style>