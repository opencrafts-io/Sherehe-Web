import { useShallow } from "zustand/react/shallow";
import usePaymentStore from "../../../stores/paymentStore";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ErrorPaymentDialogue from "./errorPaymentDialogue";
import { useNavigationToEventTickets } from "../utils/navigationHook";
import AppSnackbar from "../../../components/ui/appSnackbar";

function FreeTicketConfirmationButton({ ticketId, ticketQuantity, eventId }: { ticketId?: string, ticketQuantity: number, eventId: string }) {
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

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const navigationToEventTickets = useNavigationToEventTickets();

    const closeDialog = () => {
        setShowError(false);
    };

    const handleBookTicket = async () => {
        if (!ticketId) {
            setShowError(true);
            setErrorShown("An error occurred");
        }

        await confirmFreeEvent(ticketId!, ticketQuantity);
        if (freeEventBooked) {
            setSnackbarOpen(true);
            setTimeout(() => {
                navigationToEventTickets(eventId);
            }, 1500);
        } else {
            setShowError(true);
            setErrorShown(error ?? "An error occurred");
        }
    };

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

                <AppSnackbar
                    open={snackbarOpen}
                    message="Ticket Booked Successfully"
                    severity='success'
                    onClose={() => setSnackbarOpen(false)}
                />

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