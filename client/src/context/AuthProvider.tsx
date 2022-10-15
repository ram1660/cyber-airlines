import { createContext, useState } from "react";
import React from 'react'
export interface AuthInterface {
    username: string;
    token: string;
}

function getInitialState(): string | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
}
const AuthContext = createContext<AuthInterface>({
    token: '',
    username: ''
});

export const AuthProvider = (children: React.ReactNode ) => {
    const [auth, setAuth] = useState(getInitialState);

    return (
        <AuthContext.Provider value={{ auth, token: '', username: '', setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;