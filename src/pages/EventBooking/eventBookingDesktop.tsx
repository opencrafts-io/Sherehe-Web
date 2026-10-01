import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faMinus,
    faPhone,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import type { EventBookingProps } from "./eventBooking";
import PaymentButtons from "./components/paymentButtons";
import useTicketStore from "../../stores/ticketStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { CircularProgress } from "@mui/material";
import TicketErrorSection from "./components/ticketErrorSection";

function EventBookingDesktop({
    event,
    quantity,
    selectedTicket,
    total,
    phoneNumber,
    setPhoneNumber,
    increaseQuantity,
    decreaseQuantity,
    chooseTicket,
}: EventBookingProps) {
    const { isLoading, tickets, error, getTicketsByEventId } = useTicketStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            tickets: state.tickets,
            error: state.error,
            getTicketsByEventId: state.getTicketsByEventId,
        }))
    );

    const isFreeEvent =
        tickets.length === 1 && tickets[0].ticketPrice === 0;

    const freeTicket = isFreeEvent ? tickets[0] : null;

    const loadTickets = () => {
        getTicketsByEventId(event.id);
    };

    useEffect(() => {
        loadTickets();
    }, [getTicketsByEventId]);

    useEffect(() => {
        if (
            isFreeEvent &&
            selectedTicket === null
        ) {
            chooseTicket(tickets[0]);
        }
    }, [tickets, selectedTicket, chooseTicket]);

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-8 lg:px-8 lg:py-12">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="mb-2 text-sm font-medium text-primary">
                            CHECKOUT
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
                            Secure Checkout
                        </h1>

                        <p className="mt-2 text-base text-gray-500">
                            Complete your booking for{" "}
                            <span className="font-medium text-gray-700">
                                {event.eventName}
                            </span>
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

                        {/* LEFT — Ticket Selection */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-7">

                                {/* Section heading */}
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                        1
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Select Tickets
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Choose the ticket type you want
                                        </p>
                                    </div>
                                </div>

                                {/* Loading */}
                                {isLoading && (
                                    <div className="flex h-64 items-center justify-center">
                                        <CircularProgress
                                            sx={{
                                                color: "var(--color-primary)",
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <TicketErrorSection
                                        height={100}
                                        eventId={event.id}
                                    />
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
                                    // Paid event
                                    <div className="flex flex-col gap-3">
                                        {tickets.map((ticket) => {
                                            const isSelected =
                                                selectedTicket?.id === ticket.id;

                                            return (
                                                <button
                                                    key={ticket.id}
                                                    type="button"
                                                    onClick={() => chooseTicket(ticket)}
                                                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-4 text-left transition-all ${isSelected
                                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900">
                                                            {ticket.ticketName}
                                                        </h3>

                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {ticket.ticketFor} person
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-gray-900">
                                                            Ksh {ticket.ticketPrice}
                                                        </span>

                                                        <div
                                                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${isSelected
                                                                ? "border-primary bg-primary"
                                                                : "border-gray-300"
                                                                }`}
                                                        >
                                                            {isSelected && (
                                                                <div className="h-2 w-2 rounded-full bg-white" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Quantity */}
                                {tickets.length > 0 && selectedTicket && (
                                    <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                Quantity
                                            </p>

                                            <p className="mt-0.5 text-sm text-gray-500">
                                                Number of tickets
                                            </p>
                                        </div>

                                        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                                            <button
                                                type="button"
                                                onClick={decreaseQuantity}
                                                disabled={quantity === 1}
                                                className="flex h-10 w-10 cursor-pointer items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>

                                            <span className="flex h-10 w-10 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900">
                                                {quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={increaseQuantity}
                                                className="flex h-10 w-10 cursor-pointer items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT — Summary */}
                        <div className="lg:col-span-2">
                            <div className="lg:sticky lg:top-6">
                                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                                    {/* Order Summary */}
                                    <div className="p-6">
                                        <div className="mb-5 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                2
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    Order Summary
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Review your booking
                                                </p>
                                            </div>
                                        </div>

                                        {/* Selected ticket */}
                                        <div className="rounded-xl bg-gray-50 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {selectedTicket?.ticketName}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Ksh {selectedTicket?.ticketPrice} ×{" "}
                                                        {quantity}
                                                    </p>
                                                </div>

                                                <p className="font-semibold text-gray-900">
                                                    Ksh{" "}
                                                    {(selectedTicket?.ticketPrice ?? 0) *
                                                        quantity}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="mt-5 border-t border-gray-200 pt-5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-base font-medium text-gray-600">
                                                    Total
                                                </span>

                                                <span className="text-2xl font-bold text-primary">
                                                    Ksh {total}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div className="border-t border-gray-200 bg-gray-50/70 p-6">
                                        <div className="mb-5 flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                3
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    Payment
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Pay securely with M-Pesa
                                                </p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="mpesa" className="mb-2 block text-sm font-semibold text-gray-700">
                                                M-Pesa Phone Number
                                            </label>

                                            <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                                                <div className="flex items-center px-3 text-gray-400">
                                                    <FontAwesomeIcon icon={faPhone} />
                                                </div>

                                                <div className="flex items-center border-l border-gray-200 px-3 text-sm font-medium text-gray-600">
                                                    +254
                                                </div>

                                                <input
                                                    id="mpesa"
                                                    type="tel"
                                                    placeholder="712 345 678"
                                                    value={phoneNumber}
                                                    onChange={(e) =>
                                                        setPhoneNumber(e.target.value)
                                                    }
                                                    className="min-w-0 flex-1 border-0 px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                                                />
                                            </div>

                                            <div className="mt-3 flex items-start gap-2 text-xs text-gray-500">
                                                <FontAwesomeIcon
                                                    icon={faCircleInfo}
                                                    className="mt-0.5 text-gray-400"
                                                />

                                                <p>
                                                    You'll receive an M-Pesa prompt on
                                                    this number to complete your payment.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Payment button */}
                                        <div className="mt-5">
                                            <PaymentButtons />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventBookingDesktop;