import {
    faTicket,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PaidTicketCreation() {
    const handleAddTicket = () => {
        // Ticket creation form will be implemented next.
    };

    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h4 className="text-lg font-bold text-gray-900">
                        Tickets Added
                    </h4>

                    <p className="mt-1 text-sm text-gray-600">
                        Manage the ticket types available for your event.
                    </p>
                </div>

                <span className="mt-2 w-fit rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 sm:mt-0">
                    0 tickets
                </span>
            </div>

            <div className="mt-5 flex flex-col items-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center sm:py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <FontAwesomeIcon
                        icon={faTicket}
                        className="text-2xl text-primary"
                    />
                </div>

                <h5 className="mt-5 text-lg font-semibold text-gray-900">
                    No Tickets Added
                </h5>

                <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600">
                    You haven't created any tickets for this event yet.
                    Add your first ticket to give attendees a way to book
                    and attend your event.
                </p>

                <button
                    type="button"
                    onClick={handleAddTicket}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add your first Ticket
                </button>
            </div>
        </div>
    );
}

export default PaidTicketCreation;