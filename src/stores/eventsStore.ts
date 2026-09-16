import { create } from "zustand";
import type { EventModel } from "../models/event";
import type { PaginatedResponseModel } from "../models/paginatedResponseModel";
import eventService from "../services/eventService";
import { getErrorMessage } from "../utils/getErrorMessage";

interface EventState {
    isLoading: boolean;
    error: string | null;
    paginatedEvents: PaginatedResponseModel<EventModel> | null;

    getEvents: (page: number, limit?: number) => void;
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

}));

export default useEventsStore;