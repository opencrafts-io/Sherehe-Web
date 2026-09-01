import { events } from "../../models/event";
import EventCard from "./components/event_card";


function EventListing() {
    return (
        <>
            <div className="mx-auto px-4 py-6 md:px-6 md:px-8 lg:px-8 lg:py-12">
                <h1 className="text-3xl font-bold mb-3">Upcoming Events</h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            {...event}
                        />
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex mt-12 items-center justify-center gap-2">
                    {/* Previous */}
                    <button
                        className="
                            rounded-lg
                            border border-purple-200
                            bg-purple-50
                            px-4 py-2
                            text-sm font-semibold text-purple-700
                            transition-colors duration-200
                            hover:bg-purple-100
                            hover:text-purple-800
                        "
                    >
                        Previous
                    </button>

                    {/* Active page */}
                    <button
                        className="
                            rounded-lg
                            bg-black
                            px-4 py-2
                            text-sm font-semibold text-white
                            transition-colors duration-200
                            hover:bg-gray-800
                        "
                    >
                        1
                    </button>

                    {/* Other page */}
                    <button
                        className="
                            rounded-lg
                            border border-gray-200
                            bg-white
                            px-4 py-2
                            text-sm font-semibold text-gray-700
                            transition-colors duration-200
                            hover:bg-gray-100
                            hover:text-black
                        "
                    >
                        2
                    </button>

                    {/* Next */}
                    <button
                        className="
                            rounded-lg
                            border border-purple-200
                            bg-purple-50
                            px-4 py-2
                            text-sm font-semibold text-purple-700
                            transition-colors duration-200
                            hover:bg-purple-100
                            hover:text-purple-800
                        "
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default EventListing;