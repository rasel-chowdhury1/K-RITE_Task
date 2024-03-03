import React, { Children, createContext } from 'react';


export const AuthContext = createContext(null)

const AuthProviders = ({children}) => {

    const AuthInfo ={
        name: 'rasel'
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;