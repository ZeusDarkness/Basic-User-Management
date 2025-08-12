import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Homepage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import BlogPage from "./pages/BlogPage";
import AppLayout from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            { index: true, element: <Homepage /> },
            {
                path: "users",
                element: <UserPage />,
            },
            {
                path: "blogs",
                element: <BlogPage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
