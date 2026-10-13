import { useEffect, useState } from "react";
import {
    faTicket,
    faSearch,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PaginationButtonsProps } from "../../components/ui/paginationButtons";
import PaginationButtons from "../../components/ui/paginationButtons";
import { useShallow } from "zustand/react/shallow";
import useAttendeeTicketStore from "../../stores/attendeeTicketStore";
import { CircularProgress } from "@mui/material";
import AttendeeTicketCard from "./components/attendeeTicketCard";

function MyTickets() {
    const { isLoading, error, paginatedAttendeeTickets, searchAttendedEvents, getAllAttendedEvents, searchAttendedEvent } = useAttendeeTicketStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            paginatedAttendeeTickets: state.paginatedAttendeeTickets,
            searchAttendedEvents: state.searchAttendedEvents,
            getAllAttendedEvents: state.getAllAttendedEvents,
            searchAttendedEvent: state.searchAttendedEvent,
        }))
    );

    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const isSearching = searchQuery.trim().length > 0;

    const handlePrevious = () => {
        if (paginatedAttendeeTickets === null || paginatedAttendeeTickets.previousPage === null) return;

        setCurrentPage(paginatedAttendeeTickets.previousPage);
    };

    const handleNext = () => {
        if (paginatedAttendeeTickets === null || paginatedAttendeeTickets.nextPage === null) return;

        setCurrentPage(paginatedAttendeeTickets.nextPage);
    };

    useEffect(() => {
        if (searchQuery.trim()) {
            return;
        }

        getAllAttendedEvents(currentPage);

    }, [currentPage, searchQuery, getAllAttendedEvents]);

    useEffect(() => {
        const query = searchQuery.trim();

        if (!query) {
            setCurrentPage(1);
            return;
        }

        const timeoutId = window.setTimeout(async () => {
            await searchAttendedEvent(query);

        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };

    }, [searchQuery, searchAttendedEvent]);

    const handleClearSearch = () => {
        setSearchQuery("");
        setCurrentPage(1);
    };

    const paginationButtonsProps: PaginationButtonsProps = {
        handlePrevious,
        currentPage,
        previousButtonDisabled: paginatedAttendeeTickets?.previousPage === null,
        nextButtonDisabled: paginatedAttendeeTickets?.nextPage === null,
        handleNext,
    };

    const searchEmptyState =
        isSearching &&
        !isLoading &&
        searchAttendedEvents.length === 0;

    const emptyTicketsState =
        !isSearching &&
        !isLoading &&
        (
            paginatedAttendeeTickets === null ||
            paginatedAttendeeTickets.data.length === 0
        );

    return (
        <>
            <div className="flex min-h-dvh flex-col bg-gray-50">
                <div className="mx-auto flex flex-1 flex-col w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

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

                            {searchQuery.length > 0 && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* isLoading */}
                    {isLoading && (
                        <>
                            <div className="flex flex-1 justify-center items-center">
                                <CircularProgress sx={
                                    {
                                        color: "var(--color-primary)",
                                    }
                                } />
                            </div>
                        </>
                    )}

                    {/* error */}
                    {error && (
                        <>
                            <div className="flex flex-1 justify-center items-center">
                                <p>{error}</p>
                            </div>
                        </>
                    )}


                    {/* Tickets */}
                    {!isSearching && paginatedAttendeeTickets && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {paginatedAttendeeTickets?.data.map((attendeeTicket) => {
                                    return (
                                        <AttendeeTicketCard
                                            key={attendeeTicket.id}
                                            {...attendeeTicket}
                                        />
                                    );
                                })}
                            </div>
                            <PaginationButtons {...paginationButtonsProps} />
                        </>
                    )}

                    {isSearching && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {searchAttendedEvents.map((attendeeTicket) => {
                                return (
                                    <AttendeeTicketCard
                                        key={attendeeTicket.id}
                                        {...attendeeTicket}
                                    />
                                );
                            })}
                        </div>
                    )}

                    {/* Search empty state */}
                    {searchEmptyState && (
                        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="text-xl text-gray-400"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                No matching tickets
                            </h3>

                            <p className="mt-2 max-w-sm text-sm text-gray-500">
                                We couldn't find any tickets matching "{searchQuery.trim()}".
                                Try searching for a different event.
                            </p>
                        </div>
                    )}

                    {/* All tickets empty state */}
                    {emptyTicketsState && (
                        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                <FontAwesomeIcon
                                    icon={faTicket}
                                    className="text-xl text-gray-400"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                No tickets yet
                            </h3>

                            <p className="mt-2 max-w-sm text-sm text-gray-500">
                                Your event tickets will appear here once you have tickets
                                associated with your account.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </>

    );
}

export default MyTickets;