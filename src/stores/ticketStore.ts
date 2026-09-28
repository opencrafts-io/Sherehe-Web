import { create } from "zustand";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { TicketModel } from "../models/ticket";
import ticketService from "../services/ticketService";

interface TicketState {
    isLoading: boolean;
    error: string | null;
    tickets: TicketModel[];

    getTicketsByEventId: (eventId: string) => void;
}

const useTicketStore = create<TicketState>()((set) => ({
    isLoading: false,
    error: null,
    tickets: [],
    getTicketsByEventId: async (eventId: string) => {
        try {
            set({
                isLoading: true,
                error: null,
                tickets: [],
            });

            const tickets = await ticketService.getTicketsByEventId(eventId);

            set({
                isLoading: false,
                error: null,
                tickets,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                tickets: [],
            });
        }
    },
}));

export default useTicketStore;