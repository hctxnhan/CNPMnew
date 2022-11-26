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
  const topic = await getDoc(topicRef);
  if (topic.exists()) {
    return {
      id: topic.id,
      ...topic.data(),
    } as Topic;
  }
  return null;
};