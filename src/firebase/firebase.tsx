import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCII0QICirNJBae4lcgwCDRb5rdoZhLacE',
  authDomain: 'dkdt-d47d9.firebaseapp.com',
  projectId: 'dkdt-d47d9',
  storageBucket: 'dkdt-d47d9.appspot.com',
  messagingSenderId: '246741204468',
  appId: '1:246741204468:web:1fc52f5b77770f49614da1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Use emulator
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
connectFirestoreEmulator(db, 'localhost', 9098)

export { auth, db }
