import { create } from "zustand";
import { getErrorMessage } from "../utils/getErrorMessage";
import type { Attendee } from "../models/attendee";
import attendeeService from "../services/attendeeService";

interface EventAttendeeState {
    isLoading: boolean;
    attendees: Attendee[];
    error: string | null;
}

interface AttendeeState {
    attendeesByEventId: Record<string, EventAttendeeState>;

    getAttendeesByEventId: (page: number, eventId: string, limit?: number) => void;
}

const useAttendeesStore = create<AttendeeState>()((set) => ({
    attendeesByEventId: {},
    getAttendeesByEventId: async (page, eventId, limit = 8) => {
        set((state) => ({
            attendeesByEventId: {
                ...state.attendeesByEventId,
                [eventId]: {
                    isLoading: true,
                    attendees: state.attendeesByEventId[eventId]?.attendees ?? [],
                    error: null
                }
            }
        }));
        try {
            const paginatedAttendees = await attendeeService.getAttendeesByEventId(page, limit, eventId);

            set((state) => ({
                attendeesByEventId: {
                    ...state.attendeesByEventId,
                    [eventId]: {
                        isLoading: false,
                        attendees: paginatedAttendees.data,
                        error: null,
                    },
                },
            }));

        } catch (error) {
            set((state) => ({
                attendeesByEventId: {
                    ...state.attendeesByEventId,
                    [eventId]: {
                        isLoading: false,
                        attendees: [],
                        error: getErrorMessage(error),
                    },
                },
            }));
        }
    },
}));

export default useAttendeesStore;