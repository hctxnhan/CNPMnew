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
import Topic from "../utils/types/Topic";

const userRef = collection(db, "users");
const periodRef = collection(db, "periods");
const topicRef = collectionGroup(db, "topics");

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

export const addStudentToTopic = async (
  periodId: string,
  topicId: string,
  studentId: string
) => {
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

export const onPeriodsChange = (callback: () => void) => {
  const q = query(collectionGroup(db, "topics"));
  const unsubscribe = onSnapshot(q, callback);
  return unsubscribe;
};

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

//* Day 4 Loc
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

// * DAy 4 Loc
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

export function createUser(user: User) {
  const { id, ...rest } = user;
  const docRef = doc(userRef);
  return setDoc(docRef, rest);
}

export async function createPeriod(period: Period) {
  const { id, topics, ...rest } = period;

  const docRef = doc(periodRef);

  const topicsRef = collection(docRef, "topics");

  await setDoc(docRef, rest);
  topics.forEach((topic) => {
    const { id, ...rest } = topic;
    const docRef = doc(topicsRef);
    setDoc(docRef, rest);
  });
}

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
export const createTopic = async (periodId: string, topic: Topic) => {
  const topicRef = doc(collection(periodRef, periodId, "topics"));
  const { id, ...rest } = topic;
  setDoc(topicRef, rest);
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
// * Day 2 Loc
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
