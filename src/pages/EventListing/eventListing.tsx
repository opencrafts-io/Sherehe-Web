import { useEffect, useState } from "react";
import useEventsStore from "../../stores/eventsStore";
import EventCard from "./components/eventCard";
import { useShallow } from "zustand/react/shallow";
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
        if (
            paginatedEvents === null ||
            paginatedEvents.previousPage === null
        ) {
            return;
        }

        setCurrentPage(paginatedEvents.previousPage);
    };

    const handleNext = () => {
        if (
            paginatedEvents === null ||
            paginatedEvents.nextPage === null
        ) {
            return;
        }

        setCurrentPage(paginatedEvents.nextPage);
    };

    useEffect(() => {
        getEvents(currentPage);
    }, [currentPage, getEvents]);

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <p className="text-center text-red-600">{error}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <CircularProgress
                    sx={{ color: "var(--color-primary)" }}
                />
            </div>
        );
    }

    const paginationButtonsProps: PaginationButtonsProps = {
        handlePrevious,
        currentPage: paginatedEvents?.currentPage,
        previousButtonDisabled: paginatedEvents?.previousPage == null,
        nextButtonDisabled: paginatedEvents?.nextPage == null,
        handleNext,
    };

    return (
        <main className="w-full px-4 py-6 sm:px-6 md:px-8 lg:py-10">
            <div className="mx-auto w-full max-w-screen-2xl">
                {/* Page heading */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        Upcoming Events
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Discover events happening around you.
                    </p>
                </div>

                {/* Responsive event grid */}
                {paginatedEvents?.data.length ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
                        {paginatedEvents.data.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-300 px-4">
                        <p className="text-center text-gray-500">
                            No upcoming events found.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {paginatedEvents?.data.length ? (
                    <div className="mt-8 flex justify-center">
                        <PaginationButtons {...paginationButtonsProps} />
                    </div>
                ) : null}
            </div>
        </main>
    );
}

export default EventListing;