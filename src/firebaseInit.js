import Firebase from 'firebase/app' //limit the range to databsse
import firebaseConfig from './firebaseConfig'
/* eslint-disable no-unused-vars */
import firebaseDatabase from 'firebase/database' //limit range to databsse

const firebaseApp = Firebase.initializeApp(firebaseConfig)

export default firebaseApp.database()
