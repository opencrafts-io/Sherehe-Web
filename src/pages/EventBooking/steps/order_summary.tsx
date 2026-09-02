import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Ticket } from "../event_booking";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function OrderSummary({ selectedTicket,
    nextPage,
    previousPage,
    quantity,
    total,
}: {
    selectedTicket: Ticket | null,
    nextPage: () => void,
    previousPage: () => void,
    quantity: number,
    total: number,
}) {
    return (
        <>
            <div className="flex flex-col gap-3 sm:gap-4 mb-5">
                <div className="flex flex-col gap-3 md:gap-5 border border-gray-200 p-5 rounded-md">
                    <div className="w-fit rounded-md border border-purple-300 bg-purple-100 px-3 py-1">
                        <p className="text-base text-purple-700">Selected Ticket</p>
                    </div>
                    <p className="text-3xl font-bold">{selectedTicket?.ticketName}</p>
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-gray-400"
                        />
                        <p className="text-sm">Oct 28th, 2024</p>
                    </div>
                </div>
                <div className="flex flex-col border border-gray-200 p-5 gap-3 md:gap-5 rounded-md">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    <hr />
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-between">
                            <p className="text-xl">{selectedTicket?.ticketName}</p>
                            <p className="text-xl font-bold">Ksh {selectedTicket?.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-xl">Quantity</p>
                            <p className="text-xl font-bold">{quantity}</p>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold">Total</p>
                            <p className="text-3xl text-primary font-bold">Ksh {total}</p>
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
                    <button
                        type="button"
                        onClick={nextPage}
                        className="flex flex-1 justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderSummary;