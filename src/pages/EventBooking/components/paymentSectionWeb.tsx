import { faCircleInfo, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentButtons from "./paymentButtons";
import FreeTicketConfirmationButton from "./freeTicketConfirmationButton";

function PaymentSectionWeb({ phoneNumber, setPhoneNumber, isFreeEvent, ticketId, ticketQuantity }: { phoneNumber: string, setPhoneNumber: (value: string) => void, isFreeEvent: boolean, ticketId?: string, ticketQuantity: number }) {
    return (
        <>
            {isFreeEvent ? (
                <div className="border-t border-gray-200 bg-gray-50/70 p-6">
                    {/* Section heading */}
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            3
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Complete Booking
                            </h2>

                            <p className="text-sm text-gray-500">
                                Your ticket is free. No payment is required.
                            </p>
                        </div>
                    </div>

                    {/* Booking information */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                ✓
                            </div>

                            <div>
                                <p className="font-semibold text-gray-900">
                                    Free ticket
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    No payment is required. Click below to confirm
                                    your booking.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Book ticket */}
                    <FreeTicketConfirmationButton
                        ticketId={ticketId}
                        ticketQuantity={ticketQuantity}
                    />
                </div>
            ) : (
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
                        <PaymentButtons
                            phoneNumber={phoneNumber}
                            ticketId={ticketId}
                            ticketQuantity={ticketQuantity}
                        />
                    </div>
                </div>
            )}

        </>
    );
}

export default PaymentSectionWeb;