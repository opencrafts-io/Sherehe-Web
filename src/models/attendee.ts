export interface Attendee {
    id: string;
    userId: string;
    eventId: string;
    ticketId: string;
    ticketQuantity: string;
    user: ShereheUser;
}

export interface AttendeeDto {
    id: string;
    user_id: string;
    event_id: string;
    ticket_id: string;
    ticket_quantity: string;
    user: ShereheUser;
}

export function mapAttendeeDtoToAttendee(dto: AttendeeDto): Attendee {
    return {
        id: dto.id,
        userId: dto.user_id,
        eventId: dto.event_id,
        ticketId: dto.ticket_id,
        ticketQuantity: dto.ticket_quantity,
        user: dto.user,
    };
}

export interface ShereheUser {
    id: string;
    username: string;
    email: string;
    name: string;
    phone: string;
}