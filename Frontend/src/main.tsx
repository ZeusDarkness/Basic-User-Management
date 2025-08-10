/*
* Author: Hỏi Dân IT - @hoidanit   
 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/global.css"
import AppLayout from './layout.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomePage from './pages/home.page.tsx';
import UserPage from './pages/user.page.tsx';
import BlogPage from './pages/blog.page.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
    ]
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
