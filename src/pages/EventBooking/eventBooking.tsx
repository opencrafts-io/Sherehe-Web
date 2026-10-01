import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventBookingDesktop from "./eventBookingDesktop";
import EventBookingMobile from "./eventBookingMobile";
import useEventsStore from "../../stores/eventsStore";
import type { TicketModel } from "../../models/ticket";
import type { EventModel } from "../../models/event";
import useTicketStore from "../../stores/ticketStore";
import { useShallow } from "zustand/react/shallow";

export interface EventBookingProps {
    event: EventModel;
    quantity: number;
    selectedTicket: TicketModel | null;
    total: number;
    phoneNumber: string;
    isLoading: boolean;
    tickets: TicketModel[];
    error: string | null;
    isFreeEvent: boolean;
    freeTicket: TicketModel | null;
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

    if (!event) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <p className="text-gray-600">
                    Event not found
                </p>
            </div>
        );
    }

    const [selectedTicket, setSelectTicket] = useState<TicketModel | null>(null);
    const chooseTicket = (ticket: TicketModel) => {
        setSelectTicket(ticket);
    };

    const [phoneNumber, setPhoneNumber] = useState("");

    const total = selectedTicket ? selectedTicket.ticketPrice * quantity : 0;

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

    const bookingProps: EventBookingProps = {
        event,
        quantity,
        selectedTicket,
        total,
        phoneNumber,
        isLoading,
        tickets,
        error,
        isFreeEvent,
        freeTicket,
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