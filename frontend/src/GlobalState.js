import React, { createContext, useState } from "react";
import productAPI from "./api/productAPI";
import userAPI from "./api/userAPI";
import categoriesAPI from "./api/categoriesAPI";
import axios from "axios";

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);

    

    useEffect(()=>{
        const refreshToken = async () => {
        const res = await axios.get('/api/refresh_token');

        setToken(res.data.accesstoken)
        setTimeout(()=>{
            refreshToken()
        }, 15000)
        }
        refreshToken();
    }, [])

    const state = {
        token: [token, setToken],
        productAPI: productAPI(),
        userAPI: userAPI(token),
        categoriesAPI: categoriesAPI()  
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}