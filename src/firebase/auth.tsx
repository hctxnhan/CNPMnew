
import { auth } from './firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
export function signInUser(email: string, password: string) {
  console.log('signInUser', email, password);
  signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  signOut(auth);
}

export function onAuthChangeState(callback: (user: User | null) => void) {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid } = user;
      getUser(uid).then((user) => {
        callback(user);
      });
    } else {
      callback(null);
    }
  });
  return unsubscribe;
}