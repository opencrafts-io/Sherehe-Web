import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { EventModel } from "../../../models/event";
import { formatEventDateTime, isEventMultiday } from "../../../utils/EventsUtils/eventUtils";
import { faCalendarDays, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function DateLocationComponent({ event }: { event: EventModel }) {
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
    
    return (
        <>
            <div className="mt-4 flex flex-col gap-2">

                {/* Location */}
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-sm text-primary"
                        />
                    </div>

                    <p className="text-sm text-gray-600 sm:text-base">
                        {event.eventLocation}
                    </p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-sm text-primary"
                        />
                    </div>

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
        </>
    );
}

export default DateLocationComponent;