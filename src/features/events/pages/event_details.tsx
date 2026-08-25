import { events } from "../models/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

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
    const event = events.find((event) => event.id === id);

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
            <div className="pb-24">
                {/* Event Banner */}
                <div className="w-full">
                    <img
                        src={event.event_banner_image || "/images/basketball-game-concept.jpg"}
                        alt={event.event_name}
                        className="h-56 w-full object-cover"
                    />
                </div>

                {/* Event Genres*/}
                <div className="px-4 pt-5">
                    <div className="flex flex-wrap gap-2">
                        {event.event_genre?.map((genre) => (
                            <span
                                key={genre}
                                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Event Name */}
                <div className="px-4 pt-4">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900">
                        {event.event_name}
                    </h1>
                </div>

                {/* Location */}
                <div className="mt-6 px-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
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
                <div className="mt-3 px-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
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

                {/* About */}
                <section className="mt-8 px-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        About this Event
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                        {event.event_description}
                    </p>
                </section>

                {/* Who's Attending */}
                <section className="mt-8 px-4">
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
                </section>

                {/* Fixed Bottom Action */}
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4">
                    <button className="w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition-colors hover: bg-gray-800">
                        I'm Going
                    </button>

                </div>

            </div>
        </>
    );
}

export default EventDetails;