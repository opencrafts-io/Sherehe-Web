import { createBrowserRouter } from "react-router-dom";
import EventDetails from "../pages/EventDetails/eventDetails";
import AppLayout from "./appLayout";
import EventListing from "../pages/EventListing/eventListing";
import EventBooking from "../pages/EventBooking/eventBooking";
import CreateEvent from "../pages/CreateEvent/createEvent";
import LoginScreen from "../pages/Login/loginScreen";
import AuthCallBack from "../pages/AuthCallBack/authCallBack";
import AuthLoadingScreen from "../pages/AuthLoading/authLoadingScreen";
import Profile from "../pages/Profile/profile";
import MyTickets from "../pages/MyTickets/myTickets";
import MyOrganizedEvents from "../pages/MyOrganizedEvents/myOrganizedEvents";

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
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "my-tickets",
                element: <MyTickets />,
            },
            {
                path: "my-organized-events",
                element: <MyOrganizedEvents />,
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