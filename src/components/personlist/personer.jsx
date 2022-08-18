import { Fragment } from "react";
import { useContext } from "react";
// import { getPerson } from "../../firebase/firebase-database";
import { initializeApp } from 'firebase/app';
import {getFirestore, getDocs, collection} from "firebase/firestore"


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
      
      

    const [personer, setPersoner] = useState({});

    useEffect(() => {
        getPerson().then((value) => {
    
            setPersoner(value);

        });
    
    
    },[])

    console.log(personer)


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

        </Fragment>
    )
}

export default Personer;