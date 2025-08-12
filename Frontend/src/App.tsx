import { Outlet } from "react-router";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { App } from "antd";

const AppLayout = () => {
    return (
        <App>
            <Header />
            <Outlet />
            <Footer />
        </App>
    );
};

export default AppLayout;
