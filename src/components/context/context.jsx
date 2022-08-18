import { getPerson } from '../../firebase/firebase-database';
import {createContext, useEffect, useState } from 'react';


export const PersonerContext = createContext({
    personer: {},
})


export const PersonerProvider =  ({children}) => {
    const [personer, setPersoner] = useState({});
    const valuePersoner = {personer, setPersoner};

useEffect(() => {
    getPerson().then((value) => {

        value.map(element => {
            setPersoner(element)
        })
    });

},[])

return <PersonerContext.Provider value={valuePersoner} >{children}</PersonerContext.Provider>

}






