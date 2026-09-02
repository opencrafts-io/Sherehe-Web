import { faCircleInfo, faMobile, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaymentButtons from "../components/payment_buttons";

function TicketPayment({ total, phoneNumber, setPhoneNumber, previousPage, }: {
    total: number,
    phoneNumber: string,
    setPhoneNumber: (value: string) => void,
    previousPage: () => void,
}) {
    return (
        <>
            <div className="overflow-hidden rounded-md border border-gray-200 mb-5">
                {/* Total */}
                <div className="border-b border-gray-200 p-4">
                    <div className="flex flex-col items-center gap-2 md:gap-4">
                        <p className="text-sm font-bold uppercase">
                            Total to Pay
                        </p>

                        <p className="text-4xl font-bold text-primary">
                            Ksh {total}
                        </p>
                    </div>
                </div>

                {/* Payment */}
                <div className="flex flex-col gap-3 md:gap-5 p-4">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                            icon={faMobile}
                            className="text-primary"
                        />
                        <p className="text-lg font-bold">
                            Mobile Money
                        </p>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-medium">
                            Phone Number (STK Push)
                        </p>

                        {/* Phone number input */}
                        <div className="flex items-center overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">

                            <div className="px-3 text-gray-500">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>

                            <div className="border-l border-gray-300 px-3 text-gray-600">
                                +254
                            </div>

                            <input
                                type="tel"
                                placeholder="712 345 678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="flex-1 border-0 px-3 py-3 outline-none focus:ring-0"
                            />
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="text-gray-400"
                            />

                            <p>
                                Enter your number to receive a secure prompt.
                            </p>
                        </div>

                        <PaymentButtons />
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-4 border-t border-gray-200 bg-white p-4" >
                <button
                    type="button"
                    onClick={previousPage}
                    className="flex flex-1 justify-center rounded-xl border border-primary px-8 py-3 text-sm font-semibold  text-primary transition hover:bg-primary-95"
                >
                    Previous
                </button>
            </div>
        </>
    );
}

export default TicketPayment;