import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAyLtGswktFcJu5YZs7XO0iEZEbxR0noDM',
  authDomain: 'brain-8927d.firebaseapp.com',
  databaseURL: 'https://brain-8927d.firebaseio.com',
  projectId: 'brain-8927d',
  storageBucket: 'brain-8927d.appspot.com',
  messagingSenderId: '1047236234402',
  appId: '1:1047236234402:web:94ec8518be7d3b5c3a9bfb',
  measurementId: 'G-56GM7MSTVV',
}

firebase.initializeApp(firebaseConfig)

export default firebase

export const analytics = firebase.analytics()

export const firestore = firebase.firestore()
