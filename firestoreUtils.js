import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const postJob = async (jobData) => {
  try {
    const docRef = await addDoc(collection(db, "jobs"), jobData);
    return docRef.id;
  } catch (e) {
    throw new Error("Error posting job: " + e.message);
  }
};

export const fetchJobs = async () => {
  const querySnapshot = await getDocs(collection(db, "jobs"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};