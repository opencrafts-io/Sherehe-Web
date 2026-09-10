import { createBrowserRouter } from "react-router-dom";
import EventDetails from "../pages/EventDetails/event_details";
import AppLayout from "./app_layout";
import EventListing from "../pages/EventListing/event_listing";
import EventBooking from "../pages/EventBooking/event_booking";
import CreateEvent from "../pages/CreateEvent/create_event";
import LoginScreen from "../pages/Login/login_screen";
import AuthCallBack from "../pages/AuthCallBack/auth_call_back";
import AuthLoadingScreen from "../pages/AuthLoading/auth_loading_screen";

export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "dashboard",
                element: <EventListing />,
            },
            {
                path: "events/:id",
                element: <EventDetails />,
            },
            {
                path: "events/:id/booking",
                element: <EventBooking />,
            },
            {
                path: "create-event",
                element: <CreateEvent />,
            },

        ],
    },
    {
        path: "/",
        element: <AuthLoadingScreen />,
    },
    {
        path: "login",
        element: < LoginScreen />
    },
    {
        path: "auth/callback",
        element: < AuthCallBack />
    },
]);