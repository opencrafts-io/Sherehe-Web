import { create } from "zustand";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { ConfirmPayment } from "../models/payment";
import paymentService from "../services/paymentService";

interface PaymentState {
    isLoading: boolean;
    isSendingStkPush: boolean;
    isConfirmingPayment: boolean;
    error: string | null;
    stkSent: boolean;
    transId: string | null;
    freeEventBooked: boolean;
    confirmedPayment: ConfirmPayment | null;

    confirmFreeEvent: (ticketId: string, ticketQuantity: number) => void;
    stkPush: (ticketId: string, ticketQuantity: number, phoneNumber: string) => void;
    confirmPayment: () => Promise<boolean>;

}

const usePaymentStore = create<PaymentState>()((set, get) => ({
    isLoading: false,
    isSendingStkPush: false,
    isConfirmingPayment: false,
    error: null,
    stkSent: false,
    transId: null,
    freeEventBooked: false,
    confirmedPayment: null,
    confirmFreeEvent: async (ticketId: string, ticketQuantity: number) => {
        try {
            set({
                isLoading: true,
                error: null,
                freeEventBooked: false,
            });

            await paymentService.purchaseTicket(ticketId, ticketQuantity);

            set({
                isLoading: false,
                error: null,
                freeEventBooked: true,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                freeEventBooked: false,
            });
        }
    },
    stkPush: async (ticketId: string, ticketQuantity: number, phoneNumber: string) => {
        try {
            set({
                isSendingStkPush: true,
                error: null,
                stkSent: false,
                transId: null,
            });

            const paymentModel = await paymentService.purchaseTicket(ticketId, ticketQuantity, phoneNumber);

            set({
                isSendingStkPush: false,
                error: null,
                stkSent: true,
                transId: paymentModel.transId,
            });
        } catch (error) {
            set({
                isSendingStkPush: false,
                error: getErrorMessage(error),
                stkSent: false,
                transId: null,
            });
        }
    },
    confirmPayment: async () => {
        try {
            set({
                isConfirmingPayment: true,
                error: null,
                confirmedPayment: null,
            });

            const transId = get().transId;

            if (!transId) {
                return false;
            }

            const confirmedPaymentModel = await paymentService.confirmPayment(transId);

            set({
                isConfirmingPayment: false,
                error: null,
                confirmedPayment: confirmedPaymentModel,
            });

            if (confirmedPaymentModel.status === "SUCCESS" && confirmedPaymentModel.attendee) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            set({
                isConfirmingPayment: false,
                error: getErrorMessage(error),
                confirmedPayment: null,
            });

            return false;
        }
    },
}));

export default usePaymentStore;