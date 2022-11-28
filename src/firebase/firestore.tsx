import { db } from './firebase'
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
} from 'firebase/firestore'
import Topic from '../utils/types/Topic'

export const getTopic = async (topicRef: DocumentReference<DocumentData>) => {
  const topic = await getDoc(topicRef)
  if (topic.exists()) {
    return {
      id: topic.id,
      ...topic.data(),
    } as Topic
  }
  return null
}

export const createPeriod = async (period: Period) => {
  const { id, topics, startDate, endDate, ...rest } = period

  //convert timestamps to firebase timestamps
  const start = Timestamp.fromDate(new Date(startDate))
  const end = Timestamp.fromDate(new Date(endDate))
  console.log(start, end)

  const periodRef = doc(collection(db, 'periods'))
  setDoc(periodRef, {
    ...rest,
    startDate: start,
    endDate: end,
  })
}
export const getUser = async (userId: string) => {
  const q = query(userRef, where('uid', '==', userId));
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
      const topics = await getDocs(collection(periodRef, period.id, 'topics'));
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
  const q = query(userRef, where('uid', '==', userId));
  const unsubscribe = onSnapshot(q, () => {
    console.log('user data changed');
    getUser(userId).then((user) => {
      if (user) {
        callback(user);
      }
    });
  });
  return unsubscribe;
};