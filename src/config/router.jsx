import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import Private from "../layout/PrivateLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "dashboard",
                element: <Private />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    },
                ],
            },
        ],
    },
]);
