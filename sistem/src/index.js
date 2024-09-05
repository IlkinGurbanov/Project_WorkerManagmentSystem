import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";

import Signin from './Account/Signin/signin';
import RegisterForm from './Account/register/register';
import Table from './components/Panel'
import Admin from './Adminpanel/Adminpanel'
import ErrorPage from './error/Errorpage';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<RegisterForm/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/Login",
        element:<Signin/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/panel",
        element:<Table/>,
        errorElement:<ErrorPage/>
      },
      {
        path:"/adminpanel",
        element:<Admin/>,
        errorElement:<ErrorPage/>
      }
    ],
    errorElement:<ErrorPage/>
  }
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
