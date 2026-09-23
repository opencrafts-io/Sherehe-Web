import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import type { Attendee } from "../../../models/attendee";
import { getInitials } from "../../../utils/utils";

function AttendeesListing({
    isLoading,
    attendees,
}: {
    isLoading: boolean;
    attendees: Attendee[];
}) {
    if (isLoading) {
        return (
            <div className="mt-4 grid grid-cols-1 gap-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-3"
                    >
                        {/* Avatar skeleton */}
                        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-gray-200" />

                        {/* Text skeleton */}
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (attendees.length === 0) {
        return (
            <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-95">
                    <FontAwesomeIcon
                        icon={faUsers}
                        className="text-primary"
                    />
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-800">
                    Don't be boring, be the first to say you're going!
                </p>

                <p className="mt-1 text-sm text-gray-500">
                    Be the first person to join this event.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-4 grid grid-cols-1 gap-3">
            {attendees.map((attendee) => (
                <div
                    key={attendee.id}
                    className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-3"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-95 font-semibold text-primary">
                        {getInitials(attendee.user.username)}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="truncate text-sm font-bold text-gray-800">
                            {attendee.user.username}
                        </span>

                        <p className="text-sm font-medium text-gray-500">
                            Attending
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AttendeesListing;