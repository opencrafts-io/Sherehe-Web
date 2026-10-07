import type { EventBookingProps } from "./eventBooking";
import { useState } from "react";
import TicketSelection from "./steps/ticketSelection";
import OrderSummary from "./steps/orderSummary";
import TicketPayment from "./steps/ticketPayment";
import type { Steps } from "../../components/ui/bookingStepper";
import BookingStepper from "../../components/ui/bookingStepper";

function EventBookingMobile({
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
}: EventBookingProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const steps: Steps[] = [
        {
            id: 1,
            title: 'Ticket Summary',
        },
        {
            id: 2,
            title: 'Summary',
        },
        {
            id: 3,
            title: 'Payment',
        },
    ];
    const nextPage = () => {
        if (currentPage < steps.length && selectedTicket != null && quantity != 0) {
            setCurrentPage(currentPage + 1);
        }
    };
    const previousPage = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <>
            <div className="p-4 flex flex-col my-2 gap-8 min-h-screen bg-gray-50 mb-24">
                <BookingStepper currentStep={currentPage} steps={steps} />

                {currentPage === 1 && (
                    <TicketSelection
                        event={event}
                        selectedTicket={selectedTicket}
                        quantity={quantity}
                        total={total}
                        isLoading={isLoading}
                        tickets={tickets}
                        error={error}
                        isFreeEvent={isFreeEvent}
                        freeTicket={freeTicket}
                        chooseTicket={chooseTicket}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        nextPage={nextPage}
                    />
                )}
                {currentPage === 2 && (
                    <OrderSummary
                        selectedTicket={selectedTicket}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        quantity={quantity}
                        total={total}
                    />
                )}
                {currentPage === 3 && (
                    <TicketPayment
                        total={total}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        previousPage={previousPage}
                        ticketId={selectedTicket?.id}
                        ticketQuantity={quantity}
                        isFreeEvent={isFreeEvent}
                    />
                )}
            </div>

        </>
    );
}

export default EventBookingMobile;