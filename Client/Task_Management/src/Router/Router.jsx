import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../components/SignIn/SignIn";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: '/',
          element: <SignIn/>
        },
        {
            path: '/signin',
            element: <div className="bg-indigo-600 w-full h-screen"></div>
        }
      ]
    },
  ]);

  