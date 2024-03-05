import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../components/SignIn/SignIn";
import SignOut from "../components/SignUP/SignUp";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/signin',
            element: <SignIn/>
        },
        {
          path: '/signup',
          element: <SignOut/>
      },
      ]
    },
  ]);

  