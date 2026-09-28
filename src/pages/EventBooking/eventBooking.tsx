import { useState } from "react";
import { useParams } from "react-router-dom";
import EventBookingDesktop from "./eventBookingDesktop";
import EventBookingMobile from "./eventBookingMobile";
import useEventsStore from "../../stores/eventsStore";
import type { TicketModel } from "../../models/ticket";

export interface EventBookingProps {
    event: any;
    quantity: number;
    selectedTicket: TicketModel | null;
    total: number;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    chooseTicket: (ticket: TicketModel) => void;
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

    const paginatedEvents = useEventsStore(
        (state) => state.paginatedEvents
    );
    const event = paginatedEvents?.data.find((event) => event.id === id);

    const [selectedTicket, setSelectTicket] = useState<TicketModel | null>(null);
    const chooseTicket = (ticket: TicketModel) => {
        setSelectTicket(ticket);
    };

    const [phoneNumber, setPhoneNumber] = useState("");

    const total = selectedTicket ? Number(selectedTicket.ticketPrice) * quantity : 0;

    const bookingProps: EventBookingProps = {
        event,
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