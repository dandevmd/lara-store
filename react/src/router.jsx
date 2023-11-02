import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./views/auth/Register.jsx";
import Login from "./views/auth/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Surveys from "./views/Surveys.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import SurveysView from "./views/SurveysView.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "/dashboard", element: <Navigate to="/" /> },
            { path: "/surveys", element: <Surveys /> },
            { path: "/surveys/create", element: <SurveysView /> },
            { path: "/surveys/:id", element: <SurveysView /> },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            { path: "/register", element: <Register /> },
            { path: "/login", element: <Login /> },
        ],
    },
]);
