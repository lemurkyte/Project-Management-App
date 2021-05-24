<template>
  <div class="card card-body mt-4">
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
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProject, updateProject } from '@/firebase.js'

export default {
  setup() {

    const router = useRouter()
    // grab the user ID from the URL by calling the useRoute hook + using the computed 
    // to store the route.param.id
    const route = useRoute()
    // Sometimes we need state that depends on other state - in Vue this is 
    // handled with component computed properties.
    const projectId = computed(() => route.params.id)

    const form = reactive({
      name: '',
      task: ''
    })
    // show information about the current(click) project in the edit form
    // add an onMounted life-hook that will get the user, based on router id 
    // pull the project from firebase and then assign the values to the fields
    onMounted(async () => {
      const project = await getProject(projectId.value)
      form.name = project.name
      form.task = project.task
    })

    const update = async () => {
      // once user clicks submit, redirect them to home page or '/'
      await updateProject(projectId.value, {...form})
      router.push('/')
      // after create - empty input field
      form.name = ''
      form.task = ''
    }

    return { form, update }
  }
}
</script>

<style lang="scss" scoped>

</style>