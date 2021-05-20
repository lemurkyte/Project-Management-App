import firebase from 'firebase'
import { ref, onUnmounted } from 'vue' // 1: Will be used in our CRUD functions

const config = {
    apiKey: "AIzaSyAT6Bs75xwlF0QXDcyUcAiI-B9Ec-naA3k",
    authDomain: "fir-javascriptcrud-5d195.firebaseapp.com",
    databaseURL: "https://fir-javascriptcrud-5d195.firebaseio.com",
    projectId: "fir-javascriptcrud-5d195",
    storageBucket: "fir-javascriptcrud-5d195.appspot.com",
    messagingSenderId: "320324405651",
    appId: "1:320324405651:web:42dbe100a6741577eac066"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()   // 1:  saving into a const variable
const projectCollection = db.collection('projects') // 1:  grab the collection from firestore

// 2 : Make our CRUD functions and exporting them for use in other components

// create project by using the add prototype from firebase
// Add a project to the project collection
export const createProject = project => {
  return projectCollection.add(project)
}

// accept project id and return the documentation if it exist in the project collection
export const getProject = async id => {
  const project = await projectCollection.doc(id).get()
  // ternary : condition ? ifTrue : ifFalse
  return project.exists ? project.data() : null  // firebase exist method (like include/contains) 
  // Link: https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot#exists
}

// accepts project + id (through the v-for) and updates the correct project based in id
export const updateProject = (id, project) => {
  return projectCollection.doc(id).update(project)
}

// accepts id => deletes
export const deleteProject = id => {
  return projectCollection.doc(id).delete()
}

// composition hook, that will return a ref to an array of projects from the database
// to do this we add a listener(onSnapshot) on projectCollections so 
// it updates whenever a change is detected


export const useLoadProjects = () => {
  const projects = ref([])
  const close = projectCollection.onSnapshot(snapshot => {
    projects.value = snapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }))
  })
  // Creating this listener, will return us a clean-up function(onUnmounted, 
  // which we will call on the onUnmounted lifecycle(test with onUpdate)
  onUnmounted(close)
  return projects
}