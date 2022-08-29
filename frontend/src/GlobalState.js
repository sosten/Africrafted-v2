import React, { createContext, useState, useEffect } from "react";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import axios from "axios";

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);

    

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin');
            if(firstLogin){
                const refreshToken = async () => {
                const res = await axios.get('/api/refresh_token');

                setToken(res.data.accesstoken)
                setTimeout(()=>{
                    refreshToken()
                }, 15000)
            }
        refreshToken();
        }
        
    }, [])

    const state = {
        token: [token, setToken],
        ProductAPI: ProductAPI(),
        UserAPI: UserAPI(token),
        CategoriesAPI: CategoriesAPI()  
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}