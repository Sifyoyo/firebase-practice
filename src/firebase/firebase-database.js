import { initializeApp } from 'firebase/app';
import {getFirestore, getDocs, collection, setDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDJbENZ34dag2v_oLrM6TWO0jt7ugCI7t4",
  authDomain: "fir-read-practice.firebaseapp.com",
  projectId: "fir-read-practice",
  storageBucket: "fir-read-practice.appspot.com",
  messagingSenderId: "83946797246",
  appId: "1:83946797246:web:857cc1e287d7ef3fe606ef"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getPerson = async () => {
  const personCollection = collection(db, "personer")
  const personerSnapshot = await getDocs(personCollection);
  const personerList = personerSnapshot.docs.map(doc => doc.data());
  return personerList
}

const writePerson = async (fornavn, etternavn, telefon) => {
  const personCollection = collection(db, "personer")
  await setDoc(personCollection, {
    Fornavn: fornavn,
    Etternavn: etternavn,
    Telefon: telefon,
  })
}

