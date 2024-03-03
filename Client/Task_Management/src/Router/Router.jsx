import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../components/SignIn/SignIn";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/signin',
            element: <SignIn/>
        }
      ]
    },
  ]);

  