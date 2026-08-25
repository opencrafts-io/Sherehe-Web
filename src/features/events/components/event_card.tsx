import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
    faClock,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import type { EventModel } from "../models/event";
import { Link } from "react-router";

function EventCard(event: EventModel) {
    return (
        <>
            <Link to={`/events/${event.id}`}
                className="block w-full max-w-sm"
            >
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    {/* Event Image */}
                    <div className="h-48 w-full overflow-hidden">
                        <img
                            src={event.event_poster_image ?? "/images/basketball-game-concept.jpg"}
                            alt={event.event_name}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    {/* Event Details */}
                    <div className="p-5">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900">
                            {event.event_name}
                        </h2>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>{event.event_location}</span>
                        </div>

                        {/* Date */}
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span>{event.start_date}</span>
                        </div>

                        {/* Time */}
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{event.start_date}</span>
                        </div>

                        {event.event_genre && event.event_genre.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {event.event_genre.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                    >
                                        {genre}
                                    </span>
                                ))

                                }
                            </div>
                        )}

                        {/* Attendees */}
                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex items-center">
                                {/* Attendee initials */}
                                <div className="flex -space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs font-semibold text-gray-700">
                                        C
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs font-semibold text-gray-700">
                                        Z
                                    </div>
                                </div>

                                <span className="ml-3 text-sm text-gray-500">
                                    are attending
                                </span>
                            </div>
                            <FontAwesomeIcon
                                icon={faUsers}
                                className="text-gray-400"
                            />
                        </div>
                    </div>

                </div>

            </Link>

        </>
    );
}

export default EventCard;