import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTicket,
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import type { TicketModel } from "../../../models/ticket";

function OrderSummary({
    selectedTicket,
    nextPage,
    previousPage,
    quantity,
    total,
}: {
    selectedTicket: TicketModel | null;
    nextPage: () => void;
    previousPage: () => void;
    quantity: number;
    total: number;
}) {
    return (
        <>
            {/* Page Header */}
            <div className="mb-2">
                <p className="text-sm font-medium text-primary">
                    STEP 2 OF 3
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Review your booking
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Check your ticket details before continuing to payment.
                </p>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 sm:gap-5">

                {/* Selected Ticket */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Section header */}
                    <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                            <FontAwesomeIcon
                                icon={faTicket}
                                className="text-sm text-primary"
                            />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-900">
                                Your Ticket
                            </h2>

                            <p className="text-xs text-gray-500">
                                Selected ticket
                            </p>
                        </div>
                    </div>

                    {/* Ticket information */}
                    <div className="p-5">

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                                    {selectedTicket?.ticketName}
                                </h3>
                            </div>

                            {/* Price */}
                            <div className="shrink-0 text-right">
                                <p className="text-xs text-gray-500">
                                    Price
                                </p>

                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    Ksh {selectedTicket?.ticketPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Summary */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="p-5">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order Summary
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            A breakdown of your booking.
                        </p>

                        {/* Breakdown */}
                        <div className="mt-5 flex flex-col gap-4">

                            {/* Ticket */}
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-medium text-gray-900">
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

                            {/* Quantity */}
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Quantity
                                </p>

                                <p className="font-semibold text-gray-900">
                                    {quantity}
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-dashed border-gray-200" />

                            {/* Total */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-base font-semibold text-gray-900">
                                        Total
                                    </p>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        Amount to be paid
                                    </p>
                                </div>

                                <p className="text-2xl font-bold text-primary sm:text-3xl">
                                    Ksh {total}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6">
                <div className="mx-auto flex w-full max-w-3xl gap-3">

                    <button
                        type="button"
                        onClick={previousPage}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="text-xs"
                        />

                        Previous
                    </button>

                    <button
                        type="button"
                        onClick={nextPage}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                        Continue

                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className="text-xs"
                        />
                    </button>

                </div>
            </div>
        </>
    );
}

export default OrderSummary;