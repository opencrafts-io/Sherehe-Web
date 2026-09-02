import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Ticket } from "../event_booking";
import { faCalendarDays, faLocationDot, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TicketSelection({
    event,
    tickets,
    quantity,
    selectedTicket,
    increaseQuantity,
    decreaseQuantity,
    chooseTicket,
    total,
    nextPage,
}: {
    event: any,
    tickets: Ticket[],
    quantity: number,
    selectedTicket: Ticket | null,
    increaseQuantity: () => void,
    decreaseQuantity: () => void,
    chooseTicket: (ticket: Ticket) => void,
    total: number,
    nextPage: () => void,
}) {
    return (
        <>
            <div className="h-aspect-16/9">
                <img
                    src={event.event_banner_image || "/images/inferno10.jpeg"}
                    alt={event.event_name}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
                    {event.event_name}
                </h1>
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="text-gray-400"
                    />
                    <p className="text-sm">Oct 28th, 2024</p>
                </div>
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-gray-400"
                    />
                    <p className="text-sm">{event.event_location}</p>
                </div>
            </div>
            <hr className="my-3" />
            <div>
                <h1 className="text-xl font-bold">
                    Select Tickets
                </h1>

                <div className="mt-4 flex flex-col gap-3">
                    {tickets.map((ticket) => {
                        const isSelected = selectedTicket?.id === ticket.id;

                        return (
                            <div
                                key={ticket.id}
                                className={`rounded-lg border p-4 transition ${isSelected
                                    ? "border-purple-600 bg-purple-50"
                                    : "border-gray-200 bg-white"
                                    }`}
                            >
                                {/* Ticket information */}
                                <label className="flex cursor-pointer items-center gap-5">
                                    {/* Radio */}
                                    <input
                                        type="radio"
                                        name="ticket"
                                        value={ticket.id}
                                        checked={isSelected}
                                        onChange={() => chooseTicket(ticket)}
                                        className="h-5 w-5 accent-purple-600"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {ticket.ticketName}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Ksh {ticket.price}
                                        </p>
                                    </div>


                                </label>

                                {/* Quantity */}
                                {isSelected && (
                                    <div className="mt-4 flex items-center justify-between border-t border-purple-200 pt-4">
                                        <p className="text-sm font-semibold">
                                            Select Quantity
                                        </p>

                                        <div className="flex w-40 items-center justify-between border border-gray-200 bg-white py-3 px-2">
                                            <button
                                                type="button"
                                                onClick={decreaseQuantity}
                                                disabled={quantity === 1}
                                                className="text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>

                                            <span className="min-w-5 text-center text-xl font-medium">
                                                {quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={increaseQuantity}
                                                className="text-gray-600 hover:text-black"
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-gray-200 bg-white p-4" >

                {/* Total */}
                <div className="flex flex-col">
                    <p className="text-sm text-gray-500">
                        Total
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                        Ksh {total}
                    </p>
                </div>

                {/* Continue Button */}
                <button
                    type="button"
                    onClick={nextPage}
                    disabled={selectedTicket === null}
                    className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Continue
                </button>
            </div>
        </>
    );
}

export default TicketSelection;