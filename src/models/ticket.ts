export interface TicketModel {
    id: string;
    eventId: string;
    ticketName: string;
    ticketPrice: number;
    ticketFor: number;
    ticketQuantity: number;
    startDate: string;
    endDate: string;
}

export interface TicketDto {
    id: string;
    event_id: string;
    ticket_name: string;
    ticket_price: number;
    ticket_for: number;
    ticket_quantity: number;
    start_date: string;
    end_date: string;
}

export function mapEventsDtoToTickets(dto: TicketDto): TicketModel {
    return {
        id: dto.id,
        eventId: dto.event_id,
        ticketName: dto.ticket_name,
        ticketPrice: dto.ticket_price,
        ticketFor: dto.ticket_for,
        ticketQuantity: dto.ticket_quantity,
        startDate: dto.start_date,
        endDate: dto.end_date,
    };
}
