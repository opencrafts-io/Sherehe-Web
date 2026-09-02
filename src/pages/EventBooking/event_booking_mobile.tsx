import type { EventBookingProps } from "./event_booking";
import { useState } from "react";
import type { Steps } from "./models/booking_stepper";
import BookingStepper from "./components/booking_stepper";
import TicketSelection from "./steps/ticket_selection";
import OrderSummary from "./steps/order_summary";
import TicketPayment from "./steps/ticket_payment";

function EventBookingMobile({
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
            <div className="p-4 my-2 gap-4">
                <BookingStepper currentStep={currentPage} steps={steps} />

                {currentPage === 1 && (
                    <TicketSelection event={event} tickets={tickets}
                        selectedTicket={selectedTicket}
                        quantity={quantity}
                        chooseTicket={chooseTicket}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        nextPage={nextPage}
                        total={total}
                    />
                )}
                {currentPage === 2 && (
                    <OrderSummary selectedTicket={selectedTicket}
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
                    />
                )}
            </div>

        </>
    );
}

export default EventBookingMobile;