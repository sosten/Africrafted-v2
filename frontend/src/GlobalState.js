import React, { createContext, useState } from "react";
import productAPI from "./api/productAPI";
import userAPI from "./api/userAPI";
import axios from "axios";

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const res = await axios.get('/api/refresh_token');
        setToken(res.data.accesstoken)

    }

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken();
    }, [])

    const state = {
        token: [token, setToken],
        productAPI: productAPI(),
        userAPI: userAPI(token)  
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}