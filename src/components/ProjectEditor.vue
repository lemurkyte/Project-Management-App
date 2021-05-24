<template>
  <div class="card card-body mt-4 projectEditor">
    <router-link :to="'/'" class="btn btn-primary">Back</router-link>
    <h3>Edit Project</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="taskDescription">Task Title</label>
        <input type="text" v-model="form.name" class="form-control" placeholder="New task" required />
      </div>

      <div class="form-group mt-3">
        <label>Task Description</label>
        <input
          v-model="form.task"
          class="form-control"
          type="text"
          placeholder="Add new task description"
          required
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" v-model="taskCompleted"
        id="taskCompletionStatus" class="form-check-input" />
        <label for="taskCompletionStatus" class="form-check-label">Completed</label>
      </div>
      <div class="form-group">
        <label for="">Task Creation Date: {{ taskCreationDateAndTimeOfDay}}</label>
      </div>
      <button type="submit" class="btn btn-primary  mt-3">
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import router from '../router'

export default {
  setup() {
    const projectsCollection = db.collection('projects')
    const route = useRoute()
    const projectId = route.query.projectId
    const projectDescription = ref('')
    const projectCompleted = ref(null)
    const projectCreationDateAndTimeOfDay = ref(0)
    
    //console.log(projectId)
    const getProject = projectsCollection.doc(projectId).get().then(doc => {
      if (doc.exists) {
        //console.log(doc.data())
        projectDescription.value = doc.data().description
        projectCompleted.value = doc.data().completed
        projectCreationDateAndTimeOfDay.value = new Date(doc.data().creationTime).toLocaleTimeString('en-US', { month: 'long',
        year: 'numeric',
        day: 'numeric',
        })
      } else {
        console.log('No such document found!')
      }
    }).catch(error => {
      console.log('Error getting document: ', error)
    })

    onUnmounted(getProject)

    

    return { projectDescription, projectCompleted, projectCreationDateAndTimeOfDay, updateProject }
  }
}
</script>

<style lang="scss" scoped>

</style>