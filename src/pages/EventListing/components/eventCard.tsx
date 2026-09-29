import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import type { EventModel } from "../../../models/event";
import { formatEventDateTime } from "../../../utils/EventsUtils/eventUtils";
import EventGenre from "../../../components/ui/eventGenre";
import useAttendeesStore from "../../../stores/attendeeStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import AttendeesSection from "./attendeesSection";

function EventCard(event: EventModel) {
    const { startDate, startTime } = formatEventDateTime(event.startDate, event.endDate);

    const { eventAttendees, getAttendees } = useAttendeesStore(
        useShallow((state) => ({
            eventAttendees: state.attendeesByEventId[event.id],
            getAttendees: state.getAttendeesByEventId,
        }))
    );

    useEffect(() => {
        getAttendees(1, event.id, 4);
    }, [getAttendees, event.id]);

    return (
        <>
            <Link to={`/events/${event.id}`}
                className="block w-full max-w-sm"
            >
                <div className="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                    {/* Event Image */}
                    <div className={`aspect-square w-full overflow-hidden ${!event.eventCardImage ? "bg-linear-to-br from-primary via-primary-60 to-primary-70" : ""}`}>
                        {event.eventCardImage && (
                            <img
                                src={event.eventCardImage}
                                alt={event.eventName}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        )}

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
                        <AttendeesSection
                            isLoading={eventAttendees?.isLoading ?? true}
                            attendees={eventAttendees?.attendees ?? []}
                        />

                    </div>
                </div>
            </Link>
        </>
    );
}

export default EventCard;