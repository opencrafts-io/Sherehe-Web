import {
    faArrowLeft,
    faCalendarDays,
    faClock,
    faDownload,
    faLocationDot,
    faTicket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function TicketPage() {
    const navigate = useNavigate();

    // Hardcoded for now
    const ticket = {
        eventName: "Daystar Homecoming",
        ticketName: "VIP Ticket",
        date: "Saturday, 18 October 2026",
        time: "4:00 PM - 11:00 PM",
        location: "Daystar University, Athi River",
        quantity: 2,
        ticketPrice: 1500,
        qrValue: "SHEREHE-TICKET-001",
    };

    const totalPrice = ticket.ticketPrice * ticket.quantity;

    const handleDownload = () => {
        // TODO: Generate/download ticket PDF
        console.log("Downloading ticket...");
    };

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
                        {ticket.eventName}
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
                                        {ticket.eventName}
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
                                    {ticket.ticketName}
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
                                    {ticket.eventName}
                                </h3>
                            </div>

                            {/* Details grid */}
                            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

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
                                            {ticket.date}
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
                                            {ticket.time}
                                        </p>
                                    </div>
                                </div>

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
                                            {ticket.location}
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
                                            {ticket.quantity}{" "}
                                            {ticket.quantity === 1
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
                                            {ticket.ticketName}
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
                                            {ticket.ticketName}
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            Ksh {ticket.ticketPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            Quantity
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            × {ticket.quantity}
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

                                {/* QR placeholder */}
                                <div className="mx-auto mt-6 flex aspect-square w-full max-w-57.5 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-primary/20 bg-primary/5">
                                        <div className="text-center">
                                            <FontAwesomeIcon
                                                icon={faTicket}
                                                className="text-4xl text-primary/30"
                                            />

                                            <p className="mt-3 text-xs font-semibold text-primary">
                                                QR CODE
                                            </p>

                                            <p className="mt-1 px-4 text-[10px] text-gray-400">
                                                {ticket.qrValue}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-4 text-[11px] text-gray-400">
                                    Ticket ID: {ticket.qrValue}
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

                            <button
                                type="button"
                                onClick={handleDownload}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-auto"
                            >
                                <FontAwesomeIcon
                                    icon={faDownload}
                                    className="text-xs"
                                />
                                Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketPage;