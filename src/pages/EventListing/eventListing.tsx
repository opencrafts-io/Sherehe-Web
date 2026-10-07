import { useEffect, useState } from "react";
import useEventsStore from "../../stores/eventsStore";
import EventCard from "./components/eventCard";
import { useShallow } from 'zustand/react/shallow';
import CircularProgress from "@mui/material/CircularProgress";
import type { PaginationButtonsProps } from "../../components/ui/paginationButtons";
import PaginationButtons from "../../components/ui/paginationButtons";


function EventListing() {
    const { isLoading, error, paginatedEvents, getEvents } = useEventsStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            paginatedEvents: state.paginatedEvents,
            getEvents: state.getEvents,
        }))
    );

    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevious = () => {
        if (paginatedEvents === null || paginatedEvents.previousPage === null) return;

        setCurrentPage(paginatedEvents.previousPage);
    };

    const handleNext = () => {
        if (paginatedEvents === null || paginatedEvents.nextPage === null) return;

        setCurrentPage(paginatedEvents.nextPage);
    };

    useEffect(() => {
        getEvents(currentPage);

    }, [currentPage, getEvents]);

    if (error) {
        return (
            <>
                <div className="flex h-dvh justify-center items-center">
                    <p>{error}</p>
                </div>
            </>
        );
    }

    if (isLoading) {
        return (
            <>
                <div className="flex h-dvh justify-center items-center">
                    <CircularProgress sx={
                        {
                            color: "var(--color-primary)",
                        }
                    } />
                </div>
            </>
        );
    }

    const paginationButtonsProps: PaginationButtonsProps = {
        handlePrevious,
        currentPage: paginatedEvents?.currentPage,
        previousButtonDisabled: paginatedEvents?.previousPage === null,
        nextButtonDisabled: paginatedEvents?.nextPage === null,
        handleNext,
    };

    return (
        <>
            <div className="mx-auto px-4 py-6 md:px-8 lg:px-8 lg:py-12">
                <h1 className="text-3xl font-bold mb-3">Upcoming Events</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
                    {paginatedEvents?.data.map((event) => (
                        <EventCard
                            key={event.id}
                            {...event}
                        />
                    ))}
                </div>
                {/* Pagination */}
                <PaginationButtons {...paginationButtonsProps} />
            </div>
        </>
    )
}

export default EventListing;

