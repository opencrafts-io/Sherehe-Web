import {
    faArrowLeft,
    faCalendarDays,
    faClock,
    faLocationDot,
    faTicket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import useAttendeeTicketStore from "../../stores/attendeeTicketStore";
import { formatEventDateTime, isEventMultiday } from "../../utils/EventsUtils/eventUtils";
import { QRCodeSVG } from "qrcode.react";
import DownloadTicketButton from "./components/downloadTicketButton";

function TicketPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const paginatedAttendeeTickets = useAttendeeTicketStore(
        (state) => state.paginatedAttendeeTickets
    );

    const searchAttendeeTicket = useAttendeeTicketStore(
        (state) => state.searchAttendedEvents
    );

    const attendeeTicket = paginatedAttendeeTickets?.data.find(
        (attendeeTicket) => attendeeTicket.id === id
    ) ??
        searchAttendeeTicket.find((attendeeTicket) => attendeeTicket.id === id);


    if (!attendeeTicket) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <p className="text-gray-600">
                    Ticket not found
                </p>
            </div>
        );
    }

    const { startDate, startTime, endDate, endTime } = formatEventDateTime(attendeeTicket.event.startDate, attendeeTicket.event.endDate);

    const isMultidayEvent = isEventMultiday(attendeeTicket.event.startDate, attendeeTicket.event.endDate);

    const totalPrice = attendeeTicket.ticket.ticketPrice * attendeeTicket.ticketQuantity;

    const qrcodeData = `academia@opencrafts:${attendeeTicket.id}`;

    return (
        <div className="min-h-dvh bg-gray-50">
            <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-primary"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-xs"
                    />
                    Back to My Tickets
                </button>

                {/* Page heading */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                        YOUR TICKET
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {attendeeTicket.event.eventName}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Your ticket details and entry pass
                    </p>
                </div>

                {/* Ticket */}
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

                    {/* Ticket header */}
                    <div className="relative overflow-hidden bg-primary px-5 py-7 text-white sm:px-8 sm:py-8">
                        {/* Decorative circles */}
                        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />
                        <div className="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-white/5" />

                        <div className="relative">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                                        Sherehe Event
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                                        {attendeeTicket.event.eventName}
                                    </h2>
                                </div>

                                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 sm:flex">
                                    <FontAwesomeIcon
                                        icon={faTicket}
                                        className="text-lg"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-1.5">
                                <span className="text-xs font-semibold">
                                    {attendeeTicket.ticket.ticketName}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main ticket body */}
                    <div className="grid lg:grid-cols-[1fr_320px]">

                        {/* Event information */}
                        <div className="p-5 sm:p-8">

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Event details
                                </p>

                                <h3 className="mt-1 text-lg font-bold text-gray-900">
                                    {attendeeTicket.event.eventName}
                                </h3>
                            </div>

                            {/* Details grid */}
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {isMultidayEvent && (
                                    <>
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    Start Date & Time
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {startDate} - {startTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FontAwesomeIcon icon={faClock} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    End Date & Time
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {endDate} - {endTime}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {!isMultidayEvent && (
                                    <>
                                        {/* Date */}
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    Date
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {startDate}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Time */}
                                        <div className="flex gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FontAwesomeIcon icon={faClock} />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                    Time
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {startTime} - {endTime}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Location */}
                                <div className="flex gap-3 sm:col-span-2">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Location
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {attendeeTicket.event.eventLocation}
                                        </p>
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Quantity
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {attendeeTicket.ticketQuantity}{" "}
                                            {attendeeTicket.ticketQuantity === 1
                                                ? "ticket"
                                                : "tickets"}
                                        </p>
                                    </div>
                                </div>

                                {/* Ticket type */}
                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <FontAwesomeIcon icon={faTicket} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Ticket
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {attendeeTicket.ticket.ticketName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="my-8 border-t border-dashed border-gray-200" />

                            {/* Payment summary */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Payment summary
                                </p>

                                <div className="mt-4 space-y-3">

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            {attendeeTicket.ticket.ticketName}
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            Ksh {attendeeTicket.ticket.ticketPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Quantity
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            × {attendeeTicket.ticketQuantity}
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">
                                                Total paid
                                            </span>

                                            <span className="text-xl font-bold text-primary">
                                                Ksh{" "}
                                                {totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QR section */}
                        <div className="border-t border-gray-200 bg-gray-50/70 p-5 sm:p-8 lg:border-l lg:border-t-0">

                            <div className="text-center">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                                    Entry Pass
                                </p>

                                <h3 className="mt-1 text-lg font-bold text-gray-900">
                                    Scan to enter
                                </h3>

                                <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-gray-500">
                                    Present this QR code at the event entrance
                                    for verification.
                                </p>

                                {/* QR Code */}
                                <div className="mx-auto mt-6 flex aspect-square w-full max-w-57.5 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <QRCodeSVG
                                        value={qrcodeData}
                                        size={200}
                                        level="H"
                                        marginSize={2}
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        title="Attendee Ticket QR Code"
                                        className="h-full w-full"
                                    />
                                </div>

                                <p className="mt-4 text-xs text-gray-400">
                                    Ticket ID: {attendeeTicket.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Ticket footer */}
                    <div className="border-t border-gray-200 bg-gray-50/70 px-5 py-5 sm:px-8">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Keep your ticket ready
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    You can download a copy for offline access.
                                </p>
                            </div>

                            <DownloadTicketButton
                                attendeeTicket={attendeeTicket}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketPage;