<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">ePlanner</a>
    <div class="form-inline my-2 my-lg-0 offset-8">
      <p class="navbar-brand">Welcome {{ name }}</p>
      <button class="btn btn-success my-2 my-sm-0" @click="logout">
        Logout
      </button>
    </div>
  </nav>
  <div class="row justify-content-center">
    <div class="col-md-9">
      <div class="home app-container">
        <ProjectCreate />
        <ProjectList />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCreate from "@/components/ProjectCreate.vue";
import ProjectList from "@/components/ProjectList.vue";
import firebase from "firebase";
import { ref, onBeforeMount } from "vue";

export default {
  name: "Home",
  components: {
    ProjectCreate,
    ProjectList,
  },

  setup() {
    const name = ref("");

    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      console.log("testUserInfo", user.email);
      if (user) {
        name.value = user.email.split("@")[0];
      }
    });

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // sign out succes
        })
        .catch((error) => {
          console.log("err", error.message);
        });
    };

    return { logout, name };
  },
};
</script>

<style lang="scss" scoped>
.btn-success {
  background-color: #f75901;
  border: none;
}

.btn-success:hover,
.btn-primary:focus,
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-color: #b64000;
}
</style>