import { create } from "zustand";
import type { PaginatedResponseModel } from "../models/paginatedResponseModel";
import { getErrorMessage } from "../utils/getErrorMessage";
import attendeeService from "../services/attendeeService";
import type { AttendeeTicket } from "../models/attendeeTicket";

interface AttendeeTicketState {
    isLoading: boolean;
    error: string | null;
    paginatedAttendeeTickets: PaginatedResponseModel<AttendeeTicket> | null;
    searchAttendedEvents: AttendeeTicket[];

    getAllAttendedEvents: (page: number, limit?: number) => void;
    getAllAttendedSpecificEvent: (eventId: string, page: number, limit?: number) => void;
    searchAttendedEvent: (query: string) => void;
}

const useAttendeeTicketStore = create<AttendeeTicketState>()((set) => ({
    isLoading: false,
    error: null,
    paginatedAttendeeTickets: null,
    searchAttendedEvents: [],
    getAllAttendedEvents: async (page, limit = 8) => {
        try {
            set({
                isLoading: true,
                error: null,
                paginatedAttendeeTickets: null,
            });

            const paginatedAttendeeTickets = await attendeeService.getAllAttendedEvents(page, limit);

            set({
                isLoading: false,
                error: null,
                paginatedAttendeeTickets,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                paginatedAttendeeTickets: null,
            });
        }
    },
    getAllAttendedSpecificEvent: async (eventId, page, limit = 8) => {
        try {
            set({
                isLoading: true,
                error: null,
                paginatedAttendeeTickets: null,
            });

            const paginatedAttendeeTickets = await attendeeService.getAllAttendedSpecificEvent(page, limit, eventId);

            set({
                isLoading: false,
                error: null,
                paginatedAttendeeTickets,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                paginatedAttendeeTickets: null,
            });
        }
    },
    searchAttendedEvent: async (query) => {
        try {
            set({
                isLoading: true,
                error: null,
                searchAttendedEvents: [],
                paginatedAttendeeTickets: null,
            });

            const searchAttendedEvents = await attendeeService.searchAttendedEvent(query);

            set({
                isLoading: false,
                error: null,
                searchAttendedEvents,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                searchAttendedEvents: [],
            });
        }
    },
}));

export default useAttendeeTicketStore;
