import { useState } from "react";
import { useParams } from "react-router-dom";
import { events } from "../../models/event";
import EventBookingDesktop from "./event_booking_desktop";
import EventBookingMobile from "./event_booking_mobile";

export interface Ticket {
    id: string,
    ticketName: string,
    price: string,
}

export interface EventBookingProps {
    event: any;
    tickets: Ticket[];
    quantity: number;
    selectedTicket: Ticket | null;
    total: number;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    chooseTicket: (ticket: Ticket) => void;
}

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

    const [phoneNumber, setPhoneNumber] = useState("");

    const total = selectedTicket ? Number(selectedTicket.price) * quantity : 0;

    const bookingProps : EventBookingProps = {
        event,
        tickets,
        quantity,
        selectedTicket,
        total,
        phoneNumber,
        setPhoneNumber,
        increaseQuantity,
        decreaseQuantity,
        chooseTicket,
    };

    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block">
                <EventBookingDesktop {...bookingProps} />
            </div>

            {/* Mobile / small screens */}
            <div className="block lg:hidden">
                <EventBookingMobile {...bookingProps} />
            </div>
        </>
    );
}

export default EventBooking;