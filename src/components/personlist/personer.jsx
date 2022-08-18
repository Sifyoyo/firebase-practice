import { Fragment } from "react";
import { useContext } from "react";
// import { getPerson } from "../../firebase/firebase-database";
import { initializeApp } from 'firebase/app';
import {getFirestore, getDocs, collection, setDoc, doc} from "firebase/firestore"


import { useState, useEffect } from "react";

const Personer = () => {


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
      
      const getPerson = async () => {
        const personCollection = collection(db, "personer")
        const personerSnapshot = await getDocs(personCollection);
        const personerList = personerSnapshot.docs.map(doc => doc.data());
        return personerList
      }

      const writePerson = async (fornavn, etternavn, telefon) => {
        const newPersonDoc = doc(db, "personer", fornavn)
        await setDoc(newPersonDoc, {
          Fornavn: fornavn,
          Etternavn: etternavn,
          Telefon: telefon,
        })
        getPerson().then((value) => {
    
            setPersoner(value);

        });
      }
      

    const [personer, setPersoner] = useState({});

    useEffect(() => {
        getPerson().then((value) => {
    
            setPersoner(value);

        });
    },[])

    console.log(personer)

    const OnClickLagre = (fornavn, etternavn, telefon) => {
        fornavn = document.getElementById("fornavn_inp").value;
        etternavn = document.getElementById("etternavn_inp").value;
        telefon = document.getElementById("telefon_inp").value;

        return writePerson(fornavn, etternavn, telefon);
    }

    return (
        <Fragment>

    {//FIREBASE GIVES BACK AN OBJECT NOT AN ARRAY, THATS WHY .MAP() DOESNT WORK!!!!!
    Object.keys(personer).map((key,index) => {
        const {Fornavn: fornavn, Etternavn: etternavn, Telefon: telefon} = personer[key]
        
        return (
            <div key={key}>
                <p>Navn: {fornavn}</p>
                <p>Etternavn: {etternavn}</p>
                <p>Telefon: {telefon}</p>
            </div>
        )
    })}
        <input id="fornavn_inp" type="text" />
        <input id="etternavn_inp" type="text" />
        <input id="telefon_inp" type="text" />
        <button onClick={OnClickLagre}>Lagre</button>
        </Fragment>
    )
}

export default Personer;