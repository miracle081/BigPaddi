import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [userUID, setUserUID] = useState('wYDKqvQUXDhSUtPprlcdb2vKjnI3');
    const [userInfo, setUserInfo] = useState({ image: null });
    const [password, setPassword] = useState(undefined);
    const [preloader, setPreloader] = useState(false);
    const [docID, setDocID] = useState("");
    const [allJobs, setAllJobs] = useState([]);


    return (
        <AppContext.Provider value={{
            docID, setDocID,
            userInfo, setUserInfo,
            password, setPassword,
            preloader, setPreloader,
            allJobs, setAllJobs,
            userUID, setUserUID

        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }