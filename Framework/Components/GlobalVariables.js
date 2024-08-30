import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userUID, setUserUID] = useState('Iy4pnxqNcfXR2Z6yZdQ87xRAoQy1');
    const [userInfo, setUserInfo] = useState({ image: null, });
    const [preloader, setPreloader] = useState(false);
    const [docID, setDocID] = useState("");


    return (
        <AppContext.Provider value={{
            docID, setDocID,
            userInfo, setUserInfo,
            preloader, setPreloader,
            userUID, setUserUID

        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }