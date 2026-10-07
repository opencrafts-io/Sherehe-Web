import { useShallow } from "zustand/react/shallow";
import usePaymentStore from "../../../stores/paymentStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ErrorPaymentDialogue from "./errorPaymentDialogue";

function FreeTicketConfirmationButton({ ticketId, ticketQuantity }: { ticketId?: string, ticketQuantity: number }) {
    const { isLoading, confirmFreeEvent, freeEventBooked, error } = usePaymentStore(
        useShallow(
            (state) => ({
                isLoading: state.isLoading,
                confirmFreeEvent: state.confirmFreeEvent,
                freeEventBooked: state.freeEventBooked,
                error: state.error,
            })
        )
    );

    const [showError, setShowError] = useState(false);

    const [errorShown, setErrorShown] = useState<string | null>(null);

    const navigate = useNavigate();

    const closeDialog = () => {
        setShowError(false);
    };

    const handleBookTicket = () => {
        if (!ticketId) {
            setShowError(true);
            setErrorShown("An error occurred");
        }

        confirmFreeEvent(ticketId!, ticketQuantity);
    };

    // Navigate after successful booking
    useEffect(() => {
        if (freeEventBooked) {
            navigate("/dashboard");
        }
    }, [freeEventBooked, navigate]);

    // Show error dialog when an error occurs
    useEffect(() => {
        if (error) {
            setShowError(true);
             setErrorShown(error);
        }
    }, [error]);


    return (
        <>
            <div className="mt-6">
                <button
                    type="button"
                    onClick={handleBookTicket}
                    disabled={isLoading}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? (
                        <>
                            <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                            />
                            Booking...
                        </>
                    ) : (
                        "Book Ticket"
                    )}
                </button>

                {/* Error Dialog */}
                <ErrorPaymentDialogue
                    showError={showError}
                    closeDialog={closeDialog}
                    error={errorShown}
                    title="Booking Failed"
                />
            </div>
        </>
    );
}

export default FreeTicketConfirmationButton;