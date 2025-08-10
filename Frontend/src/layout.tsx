/*
* Author: Hỏi Dân IT - @hoidanit   
 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import { Outlet } from "react-router";
import AppHeader from "./components/layout/app.header";
import AppFooter from "./components/layout/app.footer";
import { App } from "antd";

const AppLayout = () => {
    return (
        <App>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </App>
    )
}

export default AppLayout;

