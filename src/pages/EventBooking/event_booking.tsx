import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { events } from "../../models/event";
import {
    faPhone,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

function EventBooking() {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const { id } = useParams();

    const event = events.find((event) => event.id === id);

    interface Ticket {
        id: string,
        ticketName: string,
        price: string,
    }

    const tickets: Ticket[] = [
        {
            id: '1',
            ticketName: 'Early Bird',
            price: '300',
        },
        {
            id: '2',
            ticketName: 'General Admission',
            price: '400',
        },
        {
            id: '3',
            ticketName: 'VIP Experience',
            price: '500',
        },
    ];

    const [selectedTicket, setSelectTicket] = useState<Ticket | null>(null);
    const chooseTicket = (ticket: Ticket) => {
        setSelectTicket(ticket);
    };

    const total = selectedTicket ? Number(selectedTicket.price) * quantity : 0;

    return (
        <>
            <div className="p-4 my-10 gap-3">
                {/* Heading */}
                <div className="gap-2 py-2">
                    <h1 className="font-bold text-black text-4xl">Secure Checkout</h1>
                    <h3 className="text-base">{event?.event_name}</h3>
                </div>
                {/* Main Content */}
                <div className="flex py-4 gap-14">
                    {/* Select Tickets and Quantity */}
                    <div className="flex flex-col gap-5 flex-2">
                        <h2 className="font-bold text-2xl">1. Select Tickets</h2>
                        <hr />
                        {tickets.map((t) => (
                            <div key={t.id} onClick={() => chooseTicket(t)} className={`cursor-pointer border rounded-lg p-3 ${selectedTicket?.id === t.id ? "border-purple-600 bg-purple-100" : "border-gray-200"
                                }`}>
                                <h2 className="text-lg font-semibold">{t.ticketName}</h2>
                                <p>Ksh {t.price}</p>
                            </div>
                        ))}
                        {/* Quantity Selector */}
                        <div className="flex justify-between items-center border border-gray-200 p-3">
                            <p className="text-sm font-semibold">Select Quantity</p>
                            <div className="flex justify-between items-center border border-gray-200 w-40 py-3 px-2 gap-4">
                                <button type="button" onClick={decreaseQuantity} disabled={quantity === 1} className="text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:opacity-40">
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className="min-w-5 text-center text-xl font-medium">
                                    {quantity}
                                </span>
                                <button type="button" onClick={increaseQuantity} className="text-gray-600 hover:text-black">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Order Summary & Total */}
                    <div className="flex flex-col flex-1 p-4 gap-2 border border-gray-200 rounded-lg">
                        {/* Order Summary */}
                        <div className="gap-4">
                            <h2 className="font-bold text-2xl">2. Order Summary</h2>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg">{selectedTicket?.ticketName}</p>
                                    <p className="text-lg font-bold">Ksh {selectedTicket?.price}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-lg">Quantity</p>
                                    <p className="text-lg font-bold">{quantity}</p>
                                </div>
                                <hr />
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold">Total</p>
                                    <p className="text-2xl text-primary font-bold">Ksh {total}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="my-4 text-2xl font-semibold">
                                3. Mobile Payment
                            </h2>

                            <div className="rounded-lg border border-gray-200 p-4">
                                <p className="mb-2 text-sm font-medium">
                                    Phone Number (STK Push)
                                </p>

                                {/* Phone number input */}
                                <div className="flex items-center overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-purple-600 focus-within:ring-1 focus-within:ring-purple-600">

                                    {/* Phone icon */}
                                    <div className="px-3 text-gray-500">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>

                                    {/* Country code */}
                                    <div className="border-l border-gray-300 px-3 text-gray-600">
                                        +254
                                    </div>

                                    {/* Phone number */}
                                    <input
                                        type="tel"
                                        placeholder="712 345 678"
                                        className="flex-1 border-0 px-3 py-3 outline-none focus:ring-0"
                                    />
                                </div>

                                {/* Information text */}
                                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                    <FontAwesomeIcon
                                        icon={faCircleInfo}
                                        className="text-gray-400"
                                    />

                                    <p>
                                        Enter your number to receive a secure prompt.
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        className="w-full rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700"
                                    >
                                        Pay Now
                                    </button>

                                    <button
                                        type="button"
                                        className="w-full rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventBooking;