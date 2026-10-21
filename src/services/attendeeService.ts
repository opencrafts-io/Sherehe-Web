import { mapAttendeeDtoToAttendee, type Attendee, type AttendeeDto } from "../models/attendee";
import { mapAttendeeTicketDtoToAttendeeTicket, type AttendeeTicket, type AttendeeTicketDto } from "../models/attendeeTicket";
import type { PaginatedResponseModel } from "../models/paginatedResponseModel";
import { shereheApis } from "./api";

class AttendeeService {
    async getAttendeesByEventId(page: number, limit: number, eventId: string): Promise<PaginatedResponseModel<Attendee>> {
        const response = await shereheApis.get<PaginatedResponseModel<AttendeeDto>>(`/attendee/event/${eventId}`, {
            params: { page: page, limit: limit }
        });

        return {
            ...response.data,
            data: response.data.data.map((attendeeDto) => mapAttendeeDtoToAttendee(attendeeDto)),
        };
    }

    async getAllAttendedEvents(page: number, limit: number): Promise<PaginatedResponseModel<AttendeeTicket>> {
        const response = await shereheApis.get<PaginatedResponseModel<AttendeeTicketDto>>("/attendee/user/attended", {
            params: { page: page, limit: limit }
        });

        return {
            ...response.data,
            data: response.data.data.map((attendeeTicketDto) => mapAttendeeTicketDtoToAttendeeTicket(attendeeTicketDto)),
        };
    }

    async getAllAttendedSpecificEvent(page: number, limit: number, eventId: string): Promise<PaginatedResponseModel<AttendeeTicket>> {
        const response = await shereheApis.get<PaginatedResponseModel<AttendeeTicketDto>>(`/attendee/event/user/${eventId}`, {
            params: { page: page, limit: limit }
        });

        return {
            ...response.data,
            data: response.data.data.map((attendeeTicketDto) => mapAttendeeTicketDtoToAttendeeTicket(attendeeTicketDto)),
        };
    }

    async searchAttendedEvent(query: string): Promise<AttendeeTicket[]> {
        const response = await shereheApis.get<AttendeeTicketDto[]>("/attendee/search", {
            params: { q: query }
        });

        return response.data.map((attendeeDto) => mapAttendeeTicketDtoToAttendeeTicket(attendeeDto));
    }
}

export default new AttendeeService();