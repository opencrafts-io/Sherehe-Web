import { mapEventsDtoToEvents, type EventDto, type EventModel } from "./event";

export interface AttendeeTicket {
    id: string;
    userId: string;
    eventId: string;
    ticketId: string;
    ticketQuantity: string;
    event: EventModel;
    ticket: ShereheTicket;
}

export interface AttendeeTicketDto {
    id: string;
    user_id: string;
    event_id: string;
    ticket_id: string;
    ticket_quantity: string;
    event: EventDto;
    ticket: ShereheTicketDto;
}

export interface ShereheTicket {
    id: string;
    ticketName: string;
    ticketPrice: number;
    ticketQuantity: number;
    startDate: string;
    endDate: string;
}

export interface ShereheTicketDto {
    id: string;
    ticket_name: string;
    ticket_price: number;
    ticket_quantity: number;
    start_date: string;
    end_date: string;
}

export function mapAttendeeTicketDtoToAttendeeTicket(dto: AttendeeTicketDto): AttendeeTicket {
    return {
        id: dto.id,
        userId: dto.user_id,
        eventId: dto.event_id,
        ticketId: dto.ticket_id,
        ticketQuantity: dto.ticket_quantity,
        event: mapEventsDtoToEvents(dto.event),
        ticket: mapShereheTicketDtoToShereheTickets(dto.ticket),
    };
}

function mapShereheTicketDtoToShereheTickets(dto: ShereheTicketDto): ShereheTicket {
    return {
        id: dto.id,
        ticketName: dto.ticket_name,
        ticketPrice: dto.ticket_price,
        ticketQuantity: dto.ticket_quantity,
        startDate: dto.start_date,
        endDate: dto.end_date,
    };
}