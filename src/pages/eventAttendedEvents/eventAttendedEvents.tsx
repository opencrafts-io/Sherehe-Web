import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useShallow } from "zustand/react/shallow";
import useAttendeeTicketStore from "../../stores/attendeeTicketStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEventsStore from "../../stores/eventsStore";
import type { PaginationButtonsProps } from "../../components/ui/paginationButtons";
import AttendeeTicketCard from "../MyTickets/components/attendeeTicketCard";
import PaginationButtons from "../../components/ui/paginationButtons";
import { CircularProgress } from "@mui/material";

function EventAttendedEvents() {
    const { id } = useParams();

    const paginatedEvents = useEventsStore(
        (state) => state.paginatedEvents
    );

    const event = paginatedEvents?.data.find(
        (event) => event.id === id
    );

    const { isLoading, error, paginatedAttendeeTickets, getAllAttendedSpecificEvent } = useAttendeeTicketStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            paginatedAttendeeTickets: state.paginatedAttendeeTickets,
            getAllAttendedSpecificEvent: state.getAllAttendedSpecificEvent,
        }))
    );

    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevious = () => {
        if (paginatedAttendeeTickets === null || paginatedAttendeeTickets.previousPage === null) return;

        setCurrentPage(paginatedAttendeeTickets.previousPage);
    };

    const handleNext = () => {
        if (paginatedAttendeeTickets === null || paginatedAttendeeTickets.nextPage === null) return;

        setCurrentPage(paginatedAttendeeTickets.nextPage);
    };

    useEffect(() => {
        if (!event) return;

        getAllAttendedSpecificEvent(event.id, currentPage);
    }, [id, currentPage, getAllAttendedSpecificEvent]);

    const paginationButtonsProps: PaginationButtonsProps = {
        handlePrevious,
        currentPage,
        previousButtonDisabled: paginatedAttendeeTickets?.previousPage === null,
        nextButtonDisabled: paginatedAttendeeTickets?.nextPage === null,
        handleNext,
    };

    const emptyTicketsState =
        !isLoading &&
        (
            paginatedAttendeeTickets === null ||
            paginatedAttendeeTickets.data.length === 0
        );

    return (
        <>
            <div className="flex flex-col min-h-dvh bg-gray-50">
                <div className="mx-auto flex flex-1 flex-col w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FontAwesomeIcon icon={faTicket} />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-primary">
                                    {event?.eventName ?? "YOUR TICKETS"}
                                </p>

                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    My Tickets for this Event
                                </h1>
                            </div>
                        </div>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                            Your purchased event tickets in one place. Select a
                            ticket to view its details and get ready for the event.
                        </p>
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
                    {paginatedAttendeeTickets && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {paginatedAttendeeTickets?.data.map((attendeeTicket) => {
                                    return (
                                        <AttendeeTicketCard
                                            key={attendeeTicket.id}
                                            attendeeTicket={attendeeTicket}
                                            ticketType="specificEvent"

                                        />
                                    );
                                })}
                            </div>
                            <PaginationButtons {...paginationButtonsProps} />
                        </>
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

export default EventAttendedEvents;