import { events } from "../../models/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

//Hardcoded for now
const attendees = [
    {
        id: 1,
        username: "Eugene",
    },
    {
        id: 2,
        username: "John",
    },
    {
        id: 3,
        username: "Alice",
    },
    {
        id: 4,
        username: "Mary",
    },
];

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events.find((event) => event.id === id);

    const handleBooking = () => {
        navigate("booking");
    };

    if (!event) {
        return (
            <>
                <div className="flex min-h-screen items-center justify-center px-4">
                    <p className="text-gray-600">
                        Event not found
                    </p>

                </div>
            </>
        )
    }
    return (
        <>
            <div className="pb-8">
                {/* Event Banner */}
                {/* Will use aspect ratio, the height for large is temporary */}
                <div className="h-aspect-16/9 lg:h-160">
                    <img
                        src={event.event_banner_image || "/images/inferno10.jpeg"}
                        alt={event.event_name}
                        className="h-full w-full object-cover"
                    />
                    <div className="hidden absolute lg:inset-0 lg:bg-black/30" />
                </div>
                <div className="flex flex-col lg:flex-row lg:p-4 lg:gap-4  lg:items-start">
                    {/* First Row */}
                    <div className="flex flex-col flex-2 lg:gap-5">
                        <div className="flex flex-col p-4 md:p-5 lg:p-6 lg:border rounded-lg lg:border-gray-200">
                            {/* Event Genres*/}
                            <div className="flex flex-wrap gap-3 lg:gap-4">
                                {event.event_genre?.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Event Name */}
                            <div className="mt-4">
                                <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
                                    {event.event_name}
                                </h1>
                            </div>

                            <div className="flex flex-col lg:flex-row lg:gap-3">
                                {/* Location */}
                                <div className="mt-6">
                                    <div className="p-4 rounded-xl border border-gray-200 bg-white lg:border-none">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                                                <FontAwesomeIcon icon={faLocationDot} className="text-purple-700" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Location
                                                </p>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    {event.event_location}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* Date & Time */}
                                <div className="mt-3">
                                    <div className="p-4 rounded-xl border border-gray-200 bg-white lg:border-none">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="text-purple-700"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Date & Time
                                                </p>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    Sat, Apr 11 2026
                                                </p>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    10:00 AM - 6:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col p-4 md:p-5 lg:p-6 lg:border lg:border-gray-200 rounded-lg">
                            {/* About */}
                            <h2 className="text-xl font-bold text-gray-900">
                                About this Event
                            </h2>

                            <p className="mt-3 text-sm leading-7 text-gray-600">
                                {event.event_description}
                            </p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col flex-1 lg:gap-5">
                        {/* Fixed Bottom Action  Web*/}
                        <div className="hidden lg:flex lg:border lg:border-gray-200 lg:rounded-lg lg:bg-white lg:p-4 ">
                            <button onClick={handleBooking} className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-colors hover: bg-gray-800">
                                I'm Going
                            </button>
                        </div>

                        {/* Who's Attending */}
                        <div className="p-4 md:p-5 lg:p-6 lg:border lg:rounded-lg lg:border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                Who's attending
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-3">
                                {attendees.map((attendee) => (
                                    <div key={attendee.id} className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 font-semibold text-purple-700">
                                            {attendee.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="truncate text-sm font-bold text-gray-800">
                                                {attendee.username}
                                            </span>
                                            <p className="text-sm font-medium text-gray-800">
                                                Attending
                                            </p>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fixed Bottom Action  Mobile*/}
                        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 lg:hidden">
                            <button onClick={handleBooking} className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                                I'm Going
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventDetails;