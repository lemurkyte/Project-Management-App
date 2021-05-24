<template>
<div class="app-container row justify-content-center mt-3">
  <div class="col-md-8 border">
    <router-view/>
  </div>
</div>
</template>


<script>
import {} from '@/firebase.js'
import firebase from 'firebase'

import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'

export default {

  setup() {
    const router = useRouter();
    const route = useRoute()

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login')
        }
        else if (route.path == '/login' || route.path == '/register') {
          router.replace('/')
        }
      })
    })

  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
