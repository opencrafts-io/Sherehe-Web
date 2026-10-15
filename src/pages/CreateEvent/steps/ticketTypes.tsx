import { faTicket, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { EventTicketType } from "../createEvent";
import type { FreeTicketCreationProps } from "../components/freeTicketCreation";
import FreeTicketCreation from "../components/freeTicketCreation";

export interface TicketTypesProps {
    eventTicketType: EventTicketType | null;
    setEventTicketType: (type: EventTicketType) => void;
    ticketQuantity: string;
    setTicketQuantity: (quantity: string) => void;
    hasAttemptedToContinue: boolean;
}

function TicketTypes({
    eventTicketType,
    setEventTicketType,
    ticketQuantity,
    setTicketQuantity,
    hasAttemptedToContinue,
}: TicketTypesProps) {
    const isQuantityValid =
        /^\d+$/.test(ticketQuantity) &&
        Number(ticketQuantity) > 0 &&
        Number.isSafeInteger(Number(ticketQuantity));

    const showQuantityError =
        hasAttemptedToContinue &&
        eventTicketType === "free" &&
        !isQuantityValid;

    const freeTicketCreationProps: FreeTicketCreationProps = {
        ticketQuantity,
        setTicketQuantity,
        showQuantityError,
    };

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Create Event Tickets
                </h2>

                <h3 className="mt-1 text-gray-600">
                    Choose how attendees will access your event.
                    You can configure your ticket details below.
                </h3>
            </div>

            <div className="my-4 rounded-lg border border-gray-200 p-6">
                <div>
                    <h4 className="font-bold">
                        Is this a free or paid event?
                    </h4>

                    <p className="mt-1 text-sm text-gray-600">
                        Choose whether attendees need to pay to attend.
                    </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={() => setEventTicketType("free")}
                        aria-pressed={eventTicketType === "free"}
                        className={`rounded-lg border p-5 text-left transition ${eventTicketType === "free"
                            ? "border-primary bg-purple-50 ring-1 ring-primary"
                            : "border-gray-200 hover:border-primary"
                            }`}
                    >
                        <FontAwesomeIcon
                            icon={faTicket}
                            className="text-xl text-primary"
                        />

                        <h5 className="mt-3 font-bold text-gray-900">
                            Free event
                        </h5>

                        <p className="mt-1 text-sm text-gray-600">
                            Allow attendees to register without paying.
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => setEventTicketType("paid")}
                        aria-pressed={eventTicketType === "paid"}
                        className={`rounded-lg border p-5 text-left transition ${eventTicketType === "paid"
                            ? "border-primary bg-purple-50 ring-1 ring-primary"
                            : "border-gray-200 hover:border-primary"
                            }`}
                    >
                        <FontAwesomeIcon
                            icon={faCreditCard}
                            className="text-xl text-primary"
                        />

                        <h5 className="mt-3 font-bold text-gray-900">
                            Paid event
                        </h5>

                        <p className="mt-1 text-sm text-gray-600">
                            Create tickets that attendees purchase.
                        </p>
                    </button>
                </div>

                {eventTicketType === "free" && (
                    <FreeTicketCreation {...freeTicketCreationProps} />
                )}

                {/* Placeholder */}
                {eventTicketType === "paid" && (
                    <div className="mt-8 rounded-lg border border-purple-200 bg-purple-50 p-4">
                        <p className="text-sm text-gray-700">
                            Paid ticket configuration will be available here.
                            You'll be able to define ticket names, prices,
                            quantities, and other details.
                        </p>
                    </div>
                )}

            </div>
        </>
    );
}

export default TicketTypes;