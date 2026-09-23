import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Attendee } from "../../../models/attendee";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { getInitials } from "../../../utils/utils";

function AttendeesSection({
    isLoading,
    attendees,
}: {
    isLoading: boolean;
    attendees: Attendee[];
}) {
    if (isLoading) {
        return (
            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                    {/* Loading attendee avatars */}
                    <div className="flex -space-x-2">
                        <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white bg-gray-200" />
                        <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white bg-gray-200" />
                        <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white bg-gray-200" />
                    </div>

                    <span className="ml-3 text-sm text-gray-400">
                        Looking for attendees...
                    </span>
                </div>

                <FontAwesomeIcon
                    icon={faUsers}
                    className="text-primary"
                />
            </div>
        );
    }

    if (attendees.length === 0) {
        return (
            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-95">
                        <FontAwesomeIcon
                            icon={faUsers}
                            className="text-sm text-primary"
                        />
                    </div>

                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">
                            No attendees yet
                        </p>
                        <p className="text-xs text-gray-400">
                            Be the first to join this event
                        </p>
                    </div>
                </div>

                <FontAwesomeIcon
                    icon={faUsers}
                    className="text-primary"
                />
            </div>
        );
    }

    return (
        <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center">
                {/* Attendee initials */}
                <div className="flex -space-x-2">
                    {attendees.slice(0, 3).map((attendee) => (
                        <div
                            key={attendee.id}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-95 text-xs font-semibold text-primary"
                        >
                            {getInitials(attendee.user.username)}
                        </div>
                    ))}
                </div>

                <span className="ml-3 text-sm text-gray-500">
                    {attendees.length === 1
                        ? "is attending" : attendees.length > 1 && attendees.length < 3 ? "are attending"
                            : "and others are attending"}
                </span>
            </div>

            <FontAwesomeIcon
                icon={faUsers}
                className="text-primary"
            />
        </div>
    );
}

export default AttendeesSection;