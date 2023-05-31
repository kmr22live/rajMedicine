import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import Main from "../component/Main/Main";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/home" replace={true} /> },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Main />,
      },
    ],
  },
]);
