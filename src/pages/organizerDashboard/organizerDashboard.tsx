import {
    faArrowRight,
    faCalendarDays,
    faLocationDot,
    faUsers,
    faQrcode,
    faLink,
    faTicket,
    faUserShield,
    faUserGroup,
    faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import useEventsStore from "../../stores/eventsStore";
import { formatEventDateTime } from "../CreateEvent/utils/eventUtils";

const organizerActions = [
    {
        title: "Event Links",
        description:
            "Manage and share links to your event and ticket booking page.",
        icon: faLink,
        path: "links",
    },
    {
        title: "Ticket Management",
        description:
            "View ticket types, manage ticket availability, and track sales.",
        icon: faTicket,
        path: "tickets",
    },
    {
        title: "Scanners",
        description:
            "Manage your event scanners and their access permissions.",
        icon: faQrcode,
        path: "scanners",
    },
    {
        title: "Attendees",
        description:
            "View registered attendees and manage event entry.",
        icon: faUserGroup,
        path: "attendees",
    },
];

function OrganizerDashboard() {
    const { id } = useParams();

    const organizedEvents = useEventsStore(
        (state) => state.organizedEvents
    );

    const event = organizedEvents?.find(
        (event) => event.id === id
    );

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <p className="text-gray-600">
                    Event not found
                </p>
            </div>
        );
    }

    const {
        startDate,
    } = formatEventDateTime(
        event.startDate,
        event.endDate
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                {/* Event header */}
                <section className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                        <FontAwesomeIcon icon={faChartLine} />
                        <span>Organizer Dashboard</span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                {event.eventName}
                            </h1>

                            <div className="mt-3 flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="text-primary"
                                    />
                                    {startDate}
                                </span>

                                <span className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="text-primary"
                                    />
                                    {event.eventLocation}
                                </span>
                            </div>
                        </div>

                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            Published
                        </span>
                    </div>
                </section>

                {/* Event overview */}
                <section className="mb-10">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Event Overview
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            A quick look at your event attendance and entry team.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {/* Attendees card */}
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Attendees
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        1234
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Registered for this event
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-primary">
                                    <FontAwesomeIcon
                                        icon={faUsers}
                                        className="text-xl"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
                                <FontAwesomeIcon
                                    icon={faUserGroup}
                                    className="text-primary"
                                />
                                <span className="text-gray-500">
                                    All registered attendees
                                </span>
                            </div>
                        </div>

                        {/* Scanners card */}
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Event Scanners
                                    </p>

                                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        4
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Assigned to this event
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-primary">
                                    <FontAwesomeIcon
                                        icon={faQrcode}
                                        className="text-xl"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
                                <FontAwesomeIcon
                                    icon={faUserShield}
                                    className="text-primary"
                                />
                                <span className="text-gray-500">
                                    Manage your entry team
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Organizer actions */}
                <section>
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Organizer Actions
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Everything you need to manage your event in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {organizerActions.map((action) => (
                            <Link
                                key={action.title}
                                to={action.path}
                                className="group flex min-h-52 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <FontAwesomeIcon
                                            icon={action.icon}
                                            className="text-lg"
                                        />
                                    </div>

                                    <FontAwesomeIcon
                                        icon={faArrowRight}
                                        className="mt-1 text-gray-400 transition duration-200 group-hover:translate-x-1 group-hover:text-primary"
                                    />
                                </div>

                                <h3 className="mt-5 font-semibold text-gray-900">
                                    {action.title}
                                </h3>

                                <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
                                    {action.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default OrganizerDashboard;