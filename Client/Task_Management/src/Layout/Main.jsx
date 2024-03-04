import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import SignIn from '../components/SignIn/SignIn';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <SignIn/>
        </div>
    );
};

export default Main;