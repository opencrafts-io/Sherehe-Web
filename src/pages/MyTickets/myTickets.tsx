import { useState } from "react";
import {
    faCalendarDays,
    faChevronRight,
    faTicket,
    faUsers,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PaginationButtonsProps } from "../../components/ui/paginationButtons";
import PaginationButtons from "../../components/ui/paginationButtons";
import { Link } from "react-router-dom";

interface Ticket {
    id: number;
    eventName: string;
    ticketName: string;
    quantity: number;
    date: string;
    location: string;
}

const tickets: Ticket[] = [
    {
        id: 1,
        eventName: "Daystar Homecoming",
        ticketName: "VIP Ticket",
        quantity: 2,
        date: "Saturday, 18 October 2026",
        location: "Daystar University, Athi River",
    },
    {
        id: 2,
        eventName: "Nairobi Music Festival",
        ticketName: "General Admission",
        quantity: 1,
        date: "Saturday, 24 October 2026",
        location: "Uhuru Gardens, Nairobi",
    },
    {
        id: 3,
        eventName: "Tech & Innovation Summit",
        ticketName: "Early Bird",
        quantity: 3,
        date: "Friday, 6 November 2026",
        location: "KICC, Nairobi",
    },
];

function MyTickets() {
    const [selectedTicket, setSelectedTicket] = useState<number | null>(
        tickets[0]?.id ?? null
    );

    const [searchQuery, setSearchQuery] = useState("");

    //hardcoded for now
    const paginationButtonsProps: PaginationButtonsProps = {
        handlePrevious: () => { },
        currentPage: 1,
        previousButtonDisabled: true,
        nextButtonDisabled: true,
        handleNext: () => { },
    };

    return (
        <div className="min-h-dvh bg-gray-50">
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FontAwesomeIcon icon={faTicket} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-primary">
                                YOUR TICKETS
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                My Tickets
                            </h1>
                        </div>
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Your purchased event tickets in one place. Select a
                        ticket to view its details and get ready for the event.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search your tickets..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </div>
                </div>

                {/* Tickets */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {tickets.map((ticket) => {
                        const isSelected = selectedTicket === ticket.id;

                        return (
                            <Link to={`/my-ticket/${ticket.id}`}>
                                <button
                                    key={ticket.id}
                                    type="button"
                                    onClick={() => setSelectedTicket(ticket.id)}
                                    className={`cursor-pointer group w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 ${isSelected
                                        ? "border-primary shadow-md ring-1 ring-primary"
                                        : "border-gray-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                        }`}
                                >
                                    {/* Ticket top section */}
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Ticket icon */}
                                            <div
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${isSelected
                                                    ? "bg-primary text-white"
                                                    : "bg-primary/10 text-primary group-hover:bg-primary/15"
                                                    }`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTicket}
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1 pr-8">
                                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                                                    {ticket.ticketName}
                                                </p>

                                                <h3 className="truncate text-lg font-bold text-gray-900">
                                                    {ticket.eventName}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="my-5 border-t border-dashed border-gray-200" />

                                        {/* Ticket details */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 text-gray-400">
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                        Date
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                                        {ticket.date}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 text-gray-400">
                                                    <FontAwesomeIcon
                                                        icon={faUsers}
                                                        className="text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                        Quantity
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-gray-700">
                                                        {ticket.quantity}{" "}
                                                        {ticket.quantity === 1
                                                            ? "ticket"
                                                            : "tickets"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom action area */}
                                    <div
                                        className={`flex items-center justify-between border-t px-5 py-3.5 sm:px-6 ${isSelected
                                            ? "border-primary/10 bg-primary/5"
                                            : "border-gray-100 bg-gray-50/70"
                                            }`}
                                    >
                                        <span className="text-xs font-medium text-gray-500">
                                            {ticket.location}
                                        </span>

                                        <span
                                            className={`flex items-center gap-1 text-xs font-semibold ${isSelected
                                                ? "text-primary"
                                                : "text-gray-400 group-hover:text-primary"
                                                }`}
                                        >
                                            View ticket
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className="text-[10px]"
                                            />
                                        </span>
                                    </div>
                                </button>
                            </Link>

                        );
                    })}
                </div>
                <PaginationButtons {...paginationButtonsProps} />
            </div>
        </div>
    );
}

export default MyTickets;