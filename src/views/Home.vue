<template>
  <div class="home">
    <img src="../assets/logo.jpg" style="width: 100%;"> 
    <ProjectCreate />
    <ProjectList />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectCreate from '@/components/ProjectCreate.vue'
import ProjectList from '@/components/ProjectList.vue'

export default {
  name: 'Home',
  components: {
    ProjectCreate,
    ProjectList
  }
}
</script>
