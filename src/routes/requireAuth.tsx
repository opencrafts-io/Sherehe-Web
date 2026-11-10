import { useEffect } from "react";
import {
    Outlet,
    useLocation,
} from "react-router-dom";
import appLocalStorage from "../utils/appLocalStorage";
import { useAuthDialog } from "../pages/AuthDialogContext/context/useAuthDialog";

function RequireAuth() {
    const location = useLocation();
    const { openLoginDialog } = useAuthDialog();

    const accessToken = appLocalStorage.getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            openLoginDialog(
                `${location.pathname}${location.search}`
            );
        }
    }, [accessToken, location.pathname, location.search, openLoginDialog]);

    if (!accessToken) {
        //In future, navigate to dashboard
        return;
    }

    return <Outlet />;
}

export default RequireAuth;