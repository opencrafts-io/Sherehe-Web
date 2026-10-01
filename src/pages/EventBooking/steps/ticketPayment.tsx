import {
    faCircleInfo,
    faMobileScreenButton,
    faPhone,
    faArrowLeft,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentButtons from "../components/paymentButtons";

function TicketPayment({
    total,
    phoneNumber,
    setPhoneNumber,
    previousPage,
}: {
    total: number;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    previousPage: () => void;
}) {
    return (
        <>

            {/* Header */}
            <div className="mb-6">
                <p className="text-sm font-medium text-primary">
                    STEP 3 OF 3
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Complete payment
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Pay securely using M-Pesa to complete your booking.
                </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5">

                {/* Amount */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex flex-col items-center px-5 py-7 sm:py-8">

                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Total to Pay
                        </p>

                        <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                            Ksh {total}
                        </p>

                        <div className="mt-3 flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
                            <FontAwesomeIcon
                                icon={faShieldHalved}
                                className="text-xs text-green-600"
                            />

                            <span className="text-xs font-medium text-green-700">
                                Secure payment
                            </span>
                        </div>
                    </div>
                </section>

                {/* Payment Method */}
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Heading */}
                    <div className="border-b border-gray-100 px-5 py-4">
                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                <FontAwesomeIcon
                                    icon={faMobileScreenButton}
                                    className="text-sm text-primary"
                                />
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    M-Pesa Payment
                                </h2>

                                <p className="text-xs text-gray-500">
                                    Pay using an STK Push
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-5">

                        <label
                            htmlFor="phone-number"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            M-Pesa Phone Number
                        </label>

                        <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">

                            {/* Phone icon */}
                            <div className="flex items-center px-3 text-gray-400">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                />
                            </div>

                            {/* Country code */}
                            <div className="flex items-center border-l border-gray-200 px-3 text-sm font-medium text-gray-600">
                                +254
                            </div>

                            {/* Number */}
                            <input
                                id="phone-number"
                                type="tel"
                                inputMode="numeric"
                                placeholder="712 345 678"
                                value={phoneNumber}
                                onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                className="min-w-0 flex-1 border-0 px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                            />
                        </div>

                        {/* Information */}
                        <div className="mt-3 flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="mt-0.5 shrink-0 text-sm text-gray-400"
                            />

                            <p className="text-xs leading-relaxed text-gray-500">
                                Enter the M-Pesa number that you'd like
                                to use. You'll receive a secure payment
                                prompt on your phone.
                            </p>
                        </div>

                        {/* Payment button */}
                        <div className="mt-5">
                            <PaymentButtons />
                        </div>
                    </div>
                </section>

                {/* Payment Instructions */}
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <p className="text-sm font-semibold text-gray-800">
                        How it works
                    </p>

                    <div className="mt-3 flex flex-col gap-3">

                        <div className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                1
                            </span>

                            <p className="text-sm text-gray-600">
                                Enter your M-Pesa phone number.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                2
                            </span>

                            <p className="text-sm text-gray-600">
                                Tap the payment button to request an STK
                                Push.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                3
                            </span>

                            <p className="text-sm text-gray-600">
                                Complete the payment from your phone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6">
                <div className="mx-auto w-full max-w-3xl">

                    <button
                        type="button"
                        onClick={previousPage}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="text-xs"
                        />

                        Back to Summary
                    </button>
                </div>
            </div>
        </>
    );
}

export default TicketPayment;