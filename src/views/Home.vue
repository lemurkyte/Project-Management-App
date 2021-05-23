<template>
  <div class="home">
    <img src="../assets/logo.jpg" style="width: 100%;"> 
        <h1>Welcome {{ name }}</h1>

    <button @click="logout">
      Logout
    </button>
    <ProjectCreate />
    <ProjectList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCreate from '@/components/ProjectCreate.vue'
import ProjectList from '@/components/ProjectList.vue'
import firebase from 'firebase'
import { ref, onBeforeMount } from 'vue'

export default {
  name: 'Home',
  components: {
    ProjectCreate,
    ProjectList
  },

  setup() {
      const name = ref("")
      
      onBeforeMount(() => {
        const user = firebase.auth().currentUser
        console.log("testUserInfo", user.email)
        if (user ) {
          name.value = user.email.split('@')[0]
        }
      })

      const logout = () => {
        firebase
        .auth()
        .signOut()
        .then(() =>{
          // sign out succes
        }).catch((error) => {
          console.log("err", error.message)
        })
      }

      return { logout, name }
    }
}
</script>
