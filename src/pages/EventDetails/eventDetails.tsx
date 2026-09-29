import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import useEventsStore from "../../stores/eventsStore";
import EventGenre from "../../components/ui/eventGenre";
import {
    formatEventDateTime,
    isEventMultiday,
} from "../../utils/EventsUtils/eventUtils";
import useAttendeesStore from "../../stores/attendeeStore";
import AttendeesListing from "./components/attendeesListing";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const paginatedEvents = useEventsStore(
        (state) => state.paginatedEvents
    );

    const event = paginatedEvents?.data.find(
        (event) => event.id === id
    );

    const handleBooking = () => {
        navigate("booking");
    };

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
        startTime,
        endDate,
        endTime,
    } = formatEventDateTime(
        event.startDate,
        event.endDate
    );

    const isMultidayEvent = isEventMultiday(
        event.startDate,
        event.endDate
    );

    const eventAttendees = useAttendeesStore(
        (state) => state.attendeesByEventId[event.id]
    );

    return (
        <div className="pb-24 lg:py-10">
            <div
                className={`relative aspect-video w-full overflow-hidden lg:mx-auto lg:h-180 lg:max-w-7xl lg:rounded-2xl ${!event.eventBannerImage
                    ? "bg-linear-to-br from-primary via-primary-60 to-primary-70"
                    : ""
                    } `}
            >
                {/* Banner image */}
                {event.eventBannerImage && (
                    <img
                        src={event.eventBannerImage}
                        alt={event.eventName}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                {/* Hero overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5" />

                {/* Hero content */}
                <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-7 sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
                    <div className="max-w-3xl lg:max-w-4xl">
                        {/* Genres */}
                        <div className="hidden sm:flex sm:flex-wrap sm:gap-2">
                            {event.eventGenre?.map((genre) => (
                                <EventGenre
                                    key={genre}
                                    genre={genre}
                                />
                            ))}
                        </div>

                        {/* Event name */}
                        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            {event.eventName}
                        </h1>

                        {/* Event metadata */}
                        <div className="mt-5 hidden text-sm text-white/90 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                            {/* Location */}
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-white"
                                />

                                <span>
                                    {event.eventLocation}
                                </span>
                            </div>

                            {/* Date & time */}
                            <div className="flex items-start gap-2">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="mt-0.5 text-white"
                                />

                                {isMultidayEvent ? (
                                    <div className="flex flex-wrap items-center gap-1 ">
                                        <span>
                                            {startDate} {startTime}
                                        </span>

                                        <span>
                                            -
                                        </span>

                                        <span>
                                            {endDate} {endTime}
                                        </span>
                                    </div>
                                ) : (
                                    <span>
                                        {startDate} · {startTime} -{" "}
                                        {endTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:mt-8 lg:px-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] lg:items-start">
                    <div className="space-y-6">
                        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 gap-2 sm:hidden">
                            <h2 className="text-xl font-bold text-gray-900">
                                Event Date & Location
                            </h2>

                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-gray-600"
                                />

                                <span className="text-gray-600">
                                    {event.eventLocation}
                                </span>
                            </div>

                            <div className="flex items-start gap-2">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="mt-0.5 text-gray-600"
                                />

                                {isMultidayEvent ? (
                                    <div className="flex flex-wrap text-base items-center gap-1">
                                        <span className="text-sm text-gray-600">
                                            {startDate} {startTime}
                                        </span>

                                        <span className="text-gray-600 text-sm">
                                            -
                                        </span>

                                        <span className="text-sm text-gray-600">
                                            {endDate} {endTime}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-600 text-sm">
                                        {startDate} · {startTime} -{" "}
                                        {endTime}
                                    </span>
                                )}
                            </div>

                        </div>
                        {/* About */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 gap-3 sm:p-6 lg:p-7">
                            <h2 className="text-xl font-bold text-gray-900">
                                About this Event
                            </h2>

                            <div className="my-3 flex flex-wrap gap-2 sm:hidden">
                                {event.eventGenre?.map((genre) => (
                                    <EventGenre
                                        key={genre}
                                        genre={genre}
                                    />
                                ))}
                            </div>

                            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                                {event.eventDescription}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {/* Booking */}
                        <div className="hidden lg:block lg:rounded-2xl lg:border lg:border-gray-200 lg:bg-white lg:p-4 sm:shadow-sm">
                            <button
                                onClick={handleBooking}
                                className="w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            >
                                I'm Going
                            </button>
                        </div>

                        {/* Who's attending */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Who's attending
                            </h2>

                            <AttendeesListing
                                isLoading={
                                    eventAttendees?.isLoading ?? true
                                }
                                attendees={
                                    eventAttendees?.attendees ?? []
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-4 backdrop-blur lg:hidden">
                <button
                    onClick={handleBooking}
                    className="w-full cursor-pointer rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-60"
                >
                    I'm Going
                </button>
            </div>
        </div>
    );
}

export default EventDetails;
