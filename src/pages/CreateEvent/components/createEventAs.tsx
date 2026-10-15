import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "../../../stores/userStore";

function CreateEventAs() {
    const username = useUserStore((state) => state.user?.username);
    
    return (
        <>
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4">
                <FontAwesomeIcon
                    icon={faUserGroup}
                    className="mt-0.5 text-primary"
                />

                <div>
                    <p className="font-semibold text-gray-900">
                        Creating event as {username || "Guest"}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                        Your event and its tickets will be associated
                        with your organizer account.
                    </p>
                </div>
            </div>
        </>
    );
}

export default CreateEventAs;