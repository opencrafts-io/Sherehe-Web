import { mapAttendeeDtoToAttendee, type Attendee, type AttendeeDto } from "../models/attendee";
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
}

export default new AttendeeService();