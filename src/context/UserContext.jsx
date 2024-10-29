import {useEffect, useState} from "react";
import { useContext } from "react";
import { createContext } from "react";

//config de firebise
import { onAuthStateChanged } from "firebase/auth"
import {auth} from "../config/firebase.js";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    useEffect(() => {
        console.log('use effect en action');
        const unsuscribe = onAuthStateChanged(auth, (user)=>{
            console.log(user);
            setUser(user)
        });
        return unsuscribe;
    }, []);

    if (user===false) return <p>Loading app...</p>

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
