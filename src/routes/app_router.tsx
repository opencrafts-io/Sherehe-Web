import { createBrowserRouter } from "react-router-dom";
import EventDetails from "../features/events/pages/event_details";
import EventListing from "../features/events/pages/event_listing";
import AppLayout from "./app_layout";

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
                path: "/events/:id",
                element: <EventDetails />,
            },
        ],
    },
]);