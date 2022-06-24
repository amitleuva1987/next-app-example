import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import http from '../http-common'

export function useAuth()
{
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [initialState, setInitialState] = useState({
        isLogged:'',
        user:null
    });

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            http.get('user').then(response => {
                setInitialState({
                    ['isLogged']:true,['user']:response.data
                })    
            }).catch(error => {
                console.log(error);
            });
        }
        else{
            setInitialState({
                ...initialState,
                ['isLogged']:false
            })
        }
    },[]);

    return(
        <AuthContext.Provider value={{isAuthenticated:initialState.isLogged,initialState,setInitialState}}>
            {children}
        </AuthContext.Provider>
    );
}