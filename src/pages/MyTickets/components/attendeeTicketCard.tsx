import { Link } from "react-router-dom";
import type { AttendeeTicket } from "../../../models/attendeeTicket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronRight, faTicket, faUsers } from "@fortawesome/free-solid-svg-icons";
import { formatEventDateTime } from "../../../utils/EventsUtils/eventUtils";

function AttendeeTicketCard(attendeeTicket: AttendeeTicket) {
    const { startDate } = formatEventDateTime(attendeeTicket.event.startDate, attendeeTicket.event.endDate);

    return (
        <>
            <Link to={`/my-ticket/${attendeeTicket.id}`}>
                <button
                    type="button"
                    className="cursor-pointer group w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 border-gray-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                    {/* Ticket top section */}
                    <div className="p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            {/* Ticket icon */}
                            <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition bg-primary/10 text-primary group-hover:bg-primary/15`}
                            >
                                <FontAwesomeIcon
                                    icon={faTicket}
                                />
                            </div>

                            <div className="min-w-0 flex-1 pr-8">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                                    {attendeeTicket.ticket.ticketName}
                                </p>

                                <h3 className="truncate text-lg font-bold text-gray-900">
                                    {attendeeTicket.event.eventName}
                                </h3>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-5 border-t border-dashed border-gray-200" />

                        {/* Ticket details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-gray-400 group-hover:text-primary">
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="text-sm"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Date
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {startDate}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-gray-400 group-hover:text-primary">
                                    <FontAwesomeIcon
                                        icon={faUsers}
                                        className="text-sm"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Quantity
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                        {attendeeTicket.ticketQuantity}{" "}
                                        {attendeeTicket.ticketQuantity === 1
                                            ? "ticket"
                                            : "tickets"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom action area */}
                    <div
                        className={`flex items-center justify-between border-t px-5 py-3.5 sm:px-6 border-gray-100 bg-gray-50/70`}
                    >
                        <span className="text-xs font-medium text-gray-500">
                            {attendeeTicket.event.eventLocation}
                        </span>

                        <span
                            className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-primary"
                        >
                            View ticket
                            <FontAwesomeIcon
                                icon={faChevronRight}
                            />
                        </span>
                    </div>
                </button>
            </Link>
        </>
    );
}

export default AttendeeTicketCard;