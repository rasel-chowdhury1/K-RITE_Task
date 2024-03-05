import React, { Children, createContext, useEffect, useState } from 'react';



export const AuthContext = createContext(null)

const AuthProviders = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signUp = (name, pass) =>{
        console.log(`user name is -> ${name} and pass value is -> ${pass}`)
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({name,pass})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('name', name)
        })
        console.log('getdata -> ', localStorage.getItem("name"))
    }

    const signIn = (name,pass) =>{
        const token = localStorage.getItem('access-token')
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'content-type':'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify({name,pass})
        })
        console.log('clicked sign in function')
    }

    const logOut = () =>{
        console.log("clicked logout function")
        setLoading(true);
        if(localStorage.getItem('name'))
        {
            localStorage.removeItem('name')
            localStorage.removeItem('access-token')
        }
    }

    useEffect(() =>{
        const user = localStorage.getItem('name');

        if(user){
            console.log('user is exists.so in if condition')
            fetch('http://localhost:3000/jwt', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user})
                })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('access-token', data.token)
                setLoading(true)
            })
        }
        else{
            localStorage.removeItem('access-token')
        }
    },[])

    const AuthInfo ={
        signIn,
        signUp,
        logOut
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;