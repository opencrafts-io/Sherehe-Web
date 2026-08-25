import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/navbar";
import Footer from "../components/layout/footer";

function AppLayout() {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default AppLayout