import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import type { TicketModel } from "../../../models/ticket";
import TicketErrorSection from "../components/ticketErrorSection";
import type { EventModel } from "../../../models/event";
import DateLocationComponent from "../components/dateLocationComponent";

function TicketSelection({
    event,
    quantity,
    selectedTicket,
    total,
    isLoading,
    tickets,
    error,
    isFreeEvent,
    freeTicket,
    increaseQuantity,
    decreaseQuantity,
    chooseTicket,  
    nextPage,
}: {
    event: EventModel;
    quantity: number;
    selectedTicket: TicketModel | null;
    total: number;
    isLoading: boolean,
    tickets: TicketModel[],
    error: string | null,
    isFreeEvent: boolean,
    freeTicket: TicketModel | null,
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    chooseTicket: (ticket: TicketModel) => void; 
    nextPage: () => void;
}) {
    return (
        <>
            {/* Event Information */}
            <section className="mx-auto w-full max-w-3xl px-4 pt-4 sm:px-6 md:px-8">

                {/* Banner */}
                <div className={`relative aspect-video w-full overflow-hidden rounded-2xl shadow-sm ${!event?.eventBannerImage
                    ? "bg-linear-to-br from-primary via-primary-60 to-primary-70"
                    : ""
                    }`}>
                    {event.eventBannerImage && (
                        <img
                            src={
                                event.eventBannerImage
                            }
                            alt={event.eventName}
                            className="absolute w-full object-cover"
                        />
                    )}

                </div>

                {/* Event details */}
                <div className="mt-5">

                    <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                        {event.eventName}
                    </h1>

                    <DateLocationComponent event={event} />


                </div>
            </section>

            {/* Ticket Selection */}
            <section className="mx-auto mt-8 w-full max-w-3xl px-4 sm:px-6 md:px-8">

                {/* Heading */}
                <div className="mb-5">
                    <p className="text-sm font-medium text-primary">
                        STEP 1
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                        Select Tickets
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Choose the ticket type and quantity you'd like.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <TicketErrorSection
                        height={50}
                        eventId={event?.id ?? ''}
                    />
                )}

                {/* Loading */}
                {isLoading && (
                    <div className="flex h-52 items-center justify-center">
                        <CircularProgress
                            sx={{
                                color: "var(--color-primary)",
                            }}
                        />
                    </div>
                )}

                {/* Tickets */}
                {isFreeEvent ? (
                    // Free event
                    <div className="rounded-2xl border border-primary bg-primary/5 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {freeTicket?.ticketName}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Free entry
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900">
                                    Free
                                </span>

                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-primary">
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                   <div className="flex flex-col gap-3">
                        {tickets.map((ticket) => {
                            const isSelected =
                                selectedTicket?.id === ticket.id;

                            return (
                                <div
                                    key={ticket.id}
                                    className={`overflow-hidden rounded-2xl border bg-white transition-all ${isSelected
                                        ? "border-primary ring-1 ring-primary/30"
                                        : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    {/* Ticket */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            chooseTicket(ticket)
                                        }
                                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left sm:p-5"
                                    >
                                        {/* Left */}
                                        <div className="flex min-w-0 items-center gap-3">

                                            {/* Radio */}
                                            <div
                                                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${isSelected
                                                    ? "border-primary"
                                                    : "border-gray-300"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                                )}
                                            </div>

                                            {/* Ticket information */}
                                            <div className="min-w-0">
                                                <h3 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                                                    {ticket.ticketName}
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {ticket.ticketFor} person
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="shrink-0 text-right">
                                            <p className="text-base font-bold text-gray-900 sm:text-lg">
                                                Ksh{" "}
                                                {ticket.ticketPrice}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Quantity */}
                                    {isSelected && (
                                        <div className="border-t border-gray-100 bg-primary/5 px-4 py-4 sm:px-5">
                                            <div className="flex items-center justify-between gap-4">

                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        Quantity
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        Number of tickets
                                                    </p>
                                                </div>

                                                {/* Quantity control */}
                                                <div className="flex shrink-0 items-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            decreaseQuantity
                                                        }
                                                        disabled={
                                                            quantity === 1
                                                        }
                                                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                            className="text-xs"
                                                        />
                                                    </button>

                                                    <span className="flex h-10 min-w-10 items-center justify-center border-x border-gray-200 px-2 text-sm font-semibold text-gray-900">
                                                        {quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            increaseQuantity
                                                        }
                                                        className="flex h-10 w-10 cursor-pointer items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className="text-xs"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div> 
                )}

                {/* Empty state */}
                {!isLoading &&
                    !error &&
                    tickets.length === 0 && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                            <p className="font-medium text-gray-700">
                                No tickets available
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Tickets for this event are currently
                                unavailable.
                            </p>
                        </div>
                    )}
            </section>

            {/* Fixed Bottom Checkout Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4">

                    {/* Total */}
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500 sm:text-sm">
                            Total
                        </p>

                        <p className="truncate text-xl font-bold text-gray-900 sm:text-2xl">
                            Ksh {total}
                        </p>
                    </div>

                    {/* Continue */}
                    <button
                        type="button"
                        onClick={nextPage}
                        disabled={selectedTicket === null}
                        className="min-w-32 cursor-pointer rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-36 sm:px-8"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}

export default TicketSelection;