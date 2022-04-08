import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import api from '../services/backend-api';
import { toast } from 'react-toastify';
import jwt from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const cookies = new Cookies();
    const areToken = cookies.get('token');

    const [token, setToken] = useState(areToken);
    const [user, setUser] = useState();

    useEffect(() => {
        if(token){
            const decodedToken = jwt(token);

            api.get(`/users/${decodedToken.id}`)
            .then((response) => {
                setUser(response.data)
            }).catch((error) => {//Nunca deve acontecer
                setToken(false);
                toast.warn('Usuário deslogado, favor entrar novamente');    
            });
        }
    }, [token])        
    
    function tokenSetter(status){
        setToken(status); 
    }

    return(
        <AuthContext.Provider value={{token, tokenSetter, user, setUser}} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}