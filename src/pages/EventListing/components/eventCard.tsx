import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
    faClock,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import type { EventModel } from "../../../models/event";
import { formatEventDateTime } from "../../../utils/EventsUtils/eventUtils";
import EventGenre from "../../../components/ui/eventGenre";

function EventCard(event: EventModel) {
    const { startDate, startTime } = formatEventDateTime(event.startDate, event.endDate);

    return (
        <>
            <Link to={`/events/${event.id}`}
                className="block w-full max-w-sm"
            >
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    {/* Event Image */}
                    <div className="aspect-square w-full overflow-hidden">
                        <img
                            src={event.eventCardImage ?? "/images/basketball-game-concept.jpg"}
                            alt={event.eventName}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    {/* Event Details */}
                    <div className="p-5">
                        {/* Title */}
                        <h2
                            className={`font-bold text-gray-900 ${event.eventName.length > 60
                                ? "text-lg"
                                : "text-xl"
                                }`}
                        >
                            {event.eventName}
                        </h2>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
                            <span>{event.eventLocation}</span>
                        </div>

                        {/* Date */}
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faCalendarDays} className="text-primary" />
                            <span>{startDate}</span>
                        </div>

                        {/* Time */}
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <FontAwesomeIcon icon={faClock} className="text-primary" />
                            <span>{startTime}</span>
                        </div>

                        {event.eventGenre && event.eventGenre.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {event.eventGenre.map((genre) => (
                                    <EventGenre key={genre} genre={genre} />
                                ))}
                            </div>
                        )}

                        {/* Attendees */}
                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex items-center">
                                {/* Attendee initials */}
                                <div className="flex -space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-95 text-xs font-semibold text-primary">
                                        C
                                    </div>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-95 text-xs font-semibold text-primary">
                                        Z
                                    </div>
                                </div>

                                <span className="ml-3 text-sm text-gray-500">
                                    are attending
                                </span>
                            </div>
                            <FontAwesomeIcon
                                icon={faUsers}
                                className="text-primary"
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default EventCard;