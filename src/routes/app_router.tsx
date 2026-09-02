import { createBrowserRouter } from "react-router-dom";
import EventDetails from "../pages/EventDetails/event_details";
import AppLayout from "./app_layout";
import EventListing from "../pages/EventListing/event_listing";
import EventBooking from "../pages/EventBooking/event_booking";
import CreateEvent from "../pages/CreateEvent/create_event";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
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
]);