import { create } from "zustand";
import type { CreateEventPayload, EventModel, PaymentType } from "../models/event";
import type { PaginatedResponseModel } from "../models/paginatedResponseModel";
import eventService from "../services/eventService";
import { getErrorMessage } from "../utils/getErrorMessage";

interface EventState {
    isLoading: boolean;
    error: string | null;
    paginatedEvents: PaginatedResponseModel<EventModel> | null;

    getEvents: (page: number, limit?: number) => void;
    createEvent: (payload: CreateEventPayload, selectedPaymentType: PaymentType | null) => Promise<boolean>;
}

const useEventsStore = create<EventState>()((set) => ({
    isLoading: false,
    error: null,
    paginatedEvents: null,
    getEvents: async (page, limit = 8) => {
        try {
            set({
                isLoading: true,
                error: null,
                paginatedEvents: null,
            });

            const paginatedEvents = await eventService.getEvents(page, limit);

            set({
                isLoading: false,
                error: null,
                paginatedEvents: paginatedEvents,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                paginatedEvents: null,
            });
        }
    },
    createEvent: async (payload: CreateEventPayload, selectedPaymentType: PaymentType | null) => {
        try {
            set({
                isLoading: true,
                error: null,
            });

            const createEventPayload: CreateEventPayload = {
                ...payload,
                paybillNumber: undefined,
                accountReference: undefined,
                tillNumber: undefined,
                sendMoneyPhoneNumber: undefined,
                pochiNumber: undefined,
            };

            switch (selectedPaymentType) {
                case "paybill":
                    createEventPayload.paybillNumber = payload.paybillNumber;
                    createEventPayload.accountReference = payload.accountReference;
                    break;

                case "till":
                    createEventPayload.tillNumber = payload.tillNumber;
                    break;

                case "sendMoney":
                    createEventPayload.sendMoneyPhoneNumber = payload.sendMoneyPhoneNumber;
                    break;

                case "pochi":
                    createEventPayload.pochiNumber = payload.pochiNumber;
                    break;
                default:
                    break;
            }

            await eventService.createEvent(createEventPayload);

            set({
                isLoading: false,
                error: null,
            });

            return true;

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
            });

            return false;
        }
    }
}));

export default useEventsStore;