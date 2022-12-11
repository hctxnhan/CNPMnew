import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "../utils/types/User";
import { createUserAdditionalData, getUser } from "./firestore";

export function signInUser(email: string, password: string) {
  console.log("signInUser", email, password);
  const res = signInWithEmailAndPassword(auth, email, password);

  return res;
}

export function signOutUser() {
  signOut(auth);
}

export async function createUser(
  email: string,
  password: string = "12345678",
  user: User
) {
  // TODO
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (userCredential) {
    updateProfile(userCredential.user, {
      displayName: user.name,
    });

    const userData: User = {
      ...user,
      id: userCredential.user.uid,
    };

    console.log(userData);

    createUserAdditionalData(userData);
  }
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
