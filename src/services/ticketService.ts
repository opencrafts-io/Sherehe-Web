import { mapEventsDtoToTickets, type TicketDto, type TicketModel } from "../models/ticket";
import { shereheApis } from "./api";

class TicketService {
    async getTicketsByEventId(eventId: string): Promise<TicketModel[]> {
        const response = await shereheApis.get<TicketDto[]>(`/ticket/event/${eventId}`);

        return response.data.map((ticket) => mapEventsDtoToTickets(ticket));
    }
}

export default new TicketService();