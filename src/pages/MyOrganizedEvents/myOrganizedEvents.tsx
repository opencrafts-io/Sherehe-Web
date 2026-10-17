import { useEffect } from "react";
import useEventsStore from "../../stores/eventsStore";
import { useShallow } from "zustand/react/shallow";
import CircularProgress from "@mui/material/CircularProgress";
import useUserStore from "../../stores/userStore";
import EventCard from "../EventListing/components/eventCard";

function EventListing() {
    const { isLoading, error, organizedEvents, getEventByOrganizerId } = useEventsStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            organizedEvents: state.organizedEvents,
            getEventByOrganizerId: state.getEventByOrganizerId,
        }))
    );

    const userId = useUserStore((state) => state.user?.id);

    useEffect(() => {
        if (!userId) return;
        getEventByOrganizerId(userId);
    }, [getEventByOrganizerId, userId]);

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

    return (
        <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:py-10">
            <div className="mx-auto w-full max-w-screen-2xl">
                {/* Page heading */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                        My Organized Events
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Explore and manage your own organized Events .
                    </p>
                </div>

                {/* Responsive event grid */}
                {organizedEvents?.length ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
                        {organizedEvents.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-300 px-4">
                        <p className="text-center text-gray-500">
                            No Organized Events found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventListing;