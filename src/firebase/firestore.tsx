import { db } from "./firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  collectionGroup,
  query,
  setDoc,
  where,
  updateDoc,
  getDoc,
  Query,
  DocumentReference,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { Educator, Student, User } from "../utils/types/User";
import Period from "../utils/types/RegistrationPeriod";
import Topic from "../utils/types/Topic";

const userRef = collection(db, "users");
const periodRef = collection(db, "periods");
const topicRef = collectionGroup(db, "topics");

export async function getEducators() {
  const q = query(userRef, where("role", "==", "educator"));
  const snapshot = await getDocs(q);
  const educators: Educator[] = [];
  snapshot.forEach((doc) => {
    const { uid: id, ...rest } = doc.data();
    educators.push({
      id,
      ...rest,
    } as Educator);
  });
  return educators;
}

export async function getPeriods(): Promise<Period[]> {
  const periods = await getDocs(periodRef);

  const result = Promise.all(
    periods.docs.map(async (period) => {
      const topics = await getDocs(collection(periodRef, period.id, "topics"));
      return {
        id: period.id,
        ...period.data(),
        startDate: period.data().startDate.seconds,
        endDate: period.data().endDate.seconds,
        topics: topics.docs.map((topic) => {
          return {
            id: topic.id,
            ...topic.data(),
          } as Topic;
        }),
      } as Period;
    })
  ).then((fullData) => {
    return fullData;
  });

  return result;
}

export const onUserDataChange = (
  userId: string,
  callback: (user: User) => void
) => {
  const q = query(userRef, where("uid", "==", userId));
  const unsubscribe = onSnapshot(q, () => {
    console.log("user data changed");
    getUser(userId).then((user) => {
      if (user) {
        callback(user);
      }
    });
  });
  return unsubscribe;
};

export const onPeriodsChange = (callback: () => void) => {
  const q = query(collectionGroup(db, "topics"));
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
};

export const onSnapshotChange = (
  query: Query<DocumentData>,
  callback: () => void
) => {
  const unsubscribe = onSnapshot(query, () => {
    callback();
  });
  return unsubscribe;
};

export const createTopic = async (periodId: string, topic: Topic) => {
  const topicRef = doc(collection(periodRef, periodId, "topics"));
  const { id, ...rest } = topic;
  setDoc(topicRef, rest);
};

export const removeTopic = async (periodId: string, topicId: string) => {
  const topicRef = doc(periodRef, periodId, "topics", topicId);
  const batch = writeBatch(db);

  deleteDoc(topicRef);
};

export const getTopic = async (topicRef: DocumentReference<DocumentData>) => {
  const topic = await getDoc(topicRef);
  if (topic.exists()) {
    return {
      id: topic.id,
      ...topic.data(),
    } as Topic;
  }
  return null;
};

export const addStudentToTopic = async (
  periodId: string,
  topicId: string,
  studentId: string
) => {
  // const topicRef = doc(periodRef, periodId, 'topics', topicId);
  // const topic = await getTopic(topicRef);
  // const { members } = topic;
  // updateDoc(topicRef, {
  //   members: [...members, studentId],
  // });
  // // remove student from applied list
  // const q = query(userRef, where('uid', '==', studentId));
  // const snapshot = await getDocs(q);
  // const studentRef = snapshot.docs[0].ref;

  // console.log('Remove student from applied list');
  // updateDoc(studentRef, {
  //   appliedTopics: [],
  // });
  // remove

  //start a batch write
  const batch = writeBatch(db);
  const topicRef = doc(periodRef, periodId, "topics", topicId);
  const topic = await getTopic(topicRef);
  if (topic) {
    const { members } = topic;
    batch.update(topicRef, {
      members: [...members, studentId],
    });
    // remove student from applied list
    const q = query(userRef, where("uid", "==", studentId));
    const snapshot = await getDocs(q);
    const studentRef = snapshot.docs[0].ref;
    batch.update(studentRef, {
      appliedTopics: [],
    });
    // commit the batch
    batch.commit();
  }
};

export const addTopicToAppliedTopics = async (
  studentId: string,
  topicId: string
) => {
  const q = query(userRef, where("uid", "==", studentId));
  const snapshot = await getDocs(q);
  const studentRef = snapshot.docs[0].ref;

  const student = (await getUser(studentId)) as Student;

  const { appliedTopics } = student;
  updateDoc(studentRef, {
    appliedTopics: [...appliedTopics, topicId],
  });
};

export const removeStudentFromTopic = async (
  periodId: string,
  topicId: string,
  studentId: string
) => {
  const topicRef = doc(periodRef, periodId, "topics", topicId);
  const topic = await getTopic(topicRef);
  if (topic) {
    const { members } = topic;
    updateDoc(topicRef, {
      queue: members.filter((member) => member !== studentId),
    });
  }
};

export const getUser = async (userId: string) => {
  const q = query(userRef, where("uid", "==", userId));
  const snapshot = await getDocs(q);
  const user = snapshot.docs[0];
  if (user && user.exists()) {
    const { uid: id, ...rest } = user.data();
    const returnUser = {
      id,
      ...rest,
    } as User;
    return returnUser;
  }
  return null;
};

//temporary - need to be removed
// export const getStudent = async (id: string) => {
//   const studentRef = query(userRef, where('uid', '==', id));
//   const snapshot = await getDocs(studentRef);
//   const student: Student = {
//     id,
//     ...snapshot.docs[0].data(),
//   } as Student;

//   console.log(student);

//   return student;
// };

export const addBookmarks = async (
  studentId: string,
  periodId: string,
  topicId: string
) => {
  //updatedoc student bookmarks map
  const q = query(userRef, where("uid", "==", studentId));
  const snapshot = await getDocs(q);
  const studentRef = snapshot.docs[0].ref;
  const student = snapshot.docs[0].data();
  const bookmarks = student.bookmarkedTopics || {};

  if (bookmarks[periodId] === undefined) {
    bookmarks[periodId] = [];
  }
  if (!bookmarks[periodId].includes(topicId)) {
    bookmarks[periodId].push(topicId);
    console.log(bookmarks);
    // bookmarks[periodId] = [...bookmarks[periodId], topicId];
    updateDoc(studentRef, { bookmarkedTopics: bookmarks });
  }
};

export const removeBookmarks = async (
  studentId: string,
  periodId: string,
  topicId: string
) => {
  //updatedoc student bookmarks map
  const q = query(userRef, where("uid", "==", studentId));
  const snapshot = await getDocs(q);
  const studentRef = snapshot.docs[0].ref;
  const student = snapshot.docs[0].data();
  const bookmarks = student.bookmarkedTopics;
  bookmarks[periodId] = bookmarks[periodId].filter(
    (id: string) => id !== topicId
  );
  console.log(bookmarks);
  updateDoc(studentRef, { bookmarkedTopics: bookmarks });
};

export async function getStudentListAppliedToTopic(topicId: string) {
  console.log(topicId);
  const q = query(userRef, where("appliedTopics", "array-contains", topicId));
  const snapshot = await getDocs(q);
  const students: Student[] = [];
  snapshot.forEach((doc) => {
    const { uid: id, ...rest } = doc.data();
    students.push({
      id,
      ...rest,
    } as Student);
  });
  console.log("students", students);
  return students;
}

export async function onStudentListAppliedToTopicChange(
  topicId: string,
  callback: (students: Student[]) => void
) {
  const q = query(userRef, where("appliedTopics", "array-contains", topicId));
  const unsubscribe = onSnapshot(q, () => {
    getStudentListAppliedToTopic(topicId).then((students) => {
      callback(students);
    });
  });
  return unsubscribe;
}

export const createPeriod = async (period: Period) => {
  const { id, topics, startDate, endDate, ...rest } = period;

  //convert timestamps to firebase timestamps
  const start = Timestamp.fromDate(new Date(startDate));
  const end = Timestamp.fromDate(new Date(endDate));
  console.log(start, end);

  const periodRef = doc(collection(db, "periods"));
  setDoc(periodRef, {
    ...rest,
    startDate: start,
    endDate: end,
  });
};

export const checkIfStudentJoinedAnyTopic = (
  studentId: string,
  callback: (topicId: string | null) => void
) => {
  const q = query(topicRef, where("members", "array-contains", studentId));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    if (snapshot.docs.length > 0) {
      const topicId = snapshot.docs[0].id;
      console.log("student joined topic", topicId);
      callback(topicId);
    } else {
      console.log("student not joined any topic");
      callback(null);
    }
  });

  return unsubscribe;
};

// export function createUser(user: User) {
//   const { id, ...rest } = user;
//   const docRef = doc(userRef);
//   return setDoc(docRef, rest);
// }

// export async function createPeriod(period: Period) {
//   const { id, topics, ...rest } = period;

//   const docRef = doc(periodRef);

//   const topicsRef = collection(docRef, 'topics');

//   await setDoc(docRef, rest);
//   topics.forEach((topic) => {
//     const { id, ...rest } = topic;
//     const docRef = doc(topicsRef);
//     setDoc(docRef, rest);
//   });
// }

export const setEvaluationMembers = async (
  periodId: string,
  topicId: string,
  members: string[]
) => {
  console.log("setEvaluationMembers", periodId, topicId, members);
  const topicRef = doc(periodRef, periodId, "topics", topicId);
  // check if topic exists
  const topic = await getTopic(topicRef);
  console.log("topic", topic);
  if (topic) {
    updateDoc(topicRef, { evaluationMembers: members });
  } else {
    console.log("topic does not exist", periodId, topicId);
  }
};

export async function getAllUsers() {
  const snapshot = await getDocs(userRef);
  const users: User[] = [];
  snapshot.forEach((doc) => {
    const { uid: id, ...rest } = doc.data();
    users.push({
      id,
      ...rest,
    } as User);
  });
  return users;
}

export function createUserAdditionalData(user: User) {
  // TODO
  const { id, ...rest } = user;
  const userToAdd = {
    ...rest,
    uid: id,
  };
  const userDocRef = doc(userRef);
  setDoc(userDocRef, {
    ...userToAdd,
  });
}
