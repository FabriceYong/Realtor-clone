// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDI0sKNmmxTBA85fkilABokXU0X0zyHqyQ',
  authDomain: 'realtor-clone-46ba2.firebaseapp.com',
  projectId: 'realtor-clone-46ba2',
  storageBucket: 'realtor-clone-46ba2.appspot.com',
  messagingSenderId: '970867416596',
  appId: '1:970867416596:web:dcd7e7d8a0bf97190c9101',
  measurementId: 'G-R09NY66P67',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
// const analytics = getAnalytics(app)
