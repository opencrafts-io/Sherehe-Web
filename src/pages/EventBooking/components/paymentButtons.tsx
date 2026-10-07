import { useShallow } from "zustand/react/shallow";
import usePaymentStore from "../../../stores/paymentStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPaymentDialogue from "./errorPaymentDialogue";
import { CircularProgress } from "@mui/material";

function PaymentButtons({ phoneNumber, ticketId, ticketQuantity }: { phoneNumber: string, ticketId?: string, ticketQuantity: number }) {
    const { isSendingStkPush, isConfirmingPayment, stkPush, error, stkSent, confirmPayment } = usePaymentStore(
        useShallow(
            (state) => ({
                isSendingStkPush: state.isSendingStkPush,
                isConfirmingPayment: state.isConfirmingPayment,
                stkPush: state.stkPush,
                transId: state.transId,
                error: state.error,
                stkSent: state.stkSent,
                confirmPayment: state.confirmPayment,
            })
        )
    );

    const [showError, setShowError] = useState(false);

    const [errorShown, setErrorShown] = useState<string | null>(null);

    const closeDialog = () => {
        setShowError(false);
    };

    const handleStkPush = () => {
        if (!ticketId) {
            setShowError(true);
            setErrorShown("Please Select a ticket before paying for a ticket");
            return;
        }

        if (!phoneNumber) {
            setShowError(true);
            setErrorShown("Please Enter Phone number");
            return;
        }

        if (stkSent) {
            setShowError(true);
            setErrorShown("A prompt has already been sent to your phone. Please confirm Payment");
            return;
        }

        stkPush(ticketId, ticketQuantity, phoneNumber);
    };

    const handleConfirmPayment = async () => {
        console.log(`stkSent: ${stkSent}`);
        if (!stkSent) {
            setShowError(true);
            setErrorShown("Please pay for the ticket before confirming payment");
            return;
        }

        const success = await confirmPayment();

        if (!success) {
            setShowError(true);
            setErrorShown("Something unexpected happened, please try again");
            return;
        }

        navigate("/dashboard");
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            setShowError(true);
            setErrorShown(error);
        }
    }, [error]);

    const isLoading = isSendingStkPush || isConfirmingPayment;

    return (
        <>
            <div className="mt-6 flex flex-col gap-3">
                <button
                    type="button"
                    onClick={handleStkPush}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSendingStkPush ? (
                        <>
                            <CircularProgress
                                size={20}
                                sx={{ color: "white" }}
                            />
                            Sending...
                        </>
                    ) : (
                        "Pay Now"
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isConfirmingPayment ? (
                        <>
                            <CircularProgress
                                size={20}
                                sx={{ color: "#7C3AED" }}
                            />
                            Confirming...
                        </>
                    ) : (
                        "Confirm Payment"
                    )}
                </button>

                <ErrorPaymentDialogue
                    showError={showError}
                    closeDialog={closeDialog}
                    error={errorShown}
                    title="Confirmation Error"
                />
            </div>
        </>
    );
}

export default PaymentButtons;