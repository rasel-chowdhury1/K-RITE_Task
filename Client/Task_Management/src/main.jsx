import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './Router/Router.jsx';
import AuthProviders from './Providers/AuthProviders/AuthProviders.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProviders>
       <RouterProvider router={router}></RouterProvider>
    </AuthProviders>
  // </React.StrictMode>,
)
