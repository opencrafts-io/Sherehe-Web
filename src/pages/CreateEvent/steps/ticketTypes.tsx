import { faTicket, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { EventTicketType, EventVisibilityType, TicketType } from "../createEvent";
import type { FreeTicketCreationProps } from "../components/freeTicketCreation";
import FreeTicketCreation from "../components/freeTicketCreation";
import PaidTicketCreation, { type PaidTicketCreationProps } from "../components/paidTicketCreation";
import type { TicketCreationModel } from "../../../models/ticket";
import { Alert, type SxProps, type Theme } from "@mui/material";

export interface TicketTypesProps {
    eventTicketType: EventTicketType | null;
    handleEventTypeChange: (type: EventTicketType) => void;
    ticketQuantity: string;
    setTicketQuantity: (quantity: string) => void;
    hasAttemptedToContinue: boolean;
    paidTicketsAdded: TicketCreationModel[];
    setPaidTicketsAdded: (tickets: TicketCreationModel[]) => void;
    handleTicketAdded: (ticket: TicketCreationModel) => void;
    sxVariable: SxProps<Theme>;
    ticketTypeOptions: {
        value: TicketType;
        label: string;
        ticketFor: number;
    }[];
    ticketVisibilityOptions: {
        value: EventVisibilityType;
        label: string;
    }[];
    eventStartDateTime: string;
    eventEndDateTime: string;
}

function TicketTypes({
    eventTicketType,
    handleEventTypeChange,
    ticketQuantity,
    setTicketQuantity,
    hasAttemptedToContinue,
    paidTicketsAdded,
    setPaidTicketsAdded,
    sxVariable,
    ticketTypeOptions,
    ticketVisibilityOptions,
    eventStartDateTime,
    eventEndDateTime,
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

    const paidTicketCreationProps: PaidTicketCreationProps = {
        hasAttemptedToContinue,
        paidTicketsAdded,
        setPaidTicketsAdded,
        sxVariable,
        ticketTypeOptions,
        ticketVisibilityOptions,
        eventStartDateTime,
        eventEndDateTime,
    };

    const isEventTypeInvalid = hasAttemptedToContinue && !eventTicketType;

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
                        onClick={() => handleEventTypeChange("free")}
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
                        onClick={() => handleEventTypeChange("paid")}
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

                {isEventTypeInvalid && (
                    <Alert severity="error" className="mt-3">
                        Please select if event is free or paid.
                    </Alert>
                )}

                {eventTicketType === "free" && (
                    <FreeTicketCreation {...freeTicketCreationProps} />
                )}

                {/* Placeholder */}
                {eventTicketType === "paid" && (
                    <PaidTicketCreation {...paidTicketCreationProps} />
                )}

            </div>
        </>
    );
}

export default TicketTypes;