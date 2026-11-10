import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import AuthDialogProvider from "../pages/AuthDialogContext/authDialogContext";

function AppLayout() {
    return (
        <>
            <AuthDialogProvider>
                <NavBar />
                <main>
                    <Outlet />
                </main>

                <Footer />
            </AuthDialogProvider>
        </>
    );
}

export default AppLayout