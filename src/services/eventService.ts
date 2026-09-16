import { mapEventsDtoToEvents, type EventDto, type EventModel } from "../models/event";
import type { PaginatedResponseModel } from "../models/paginatedResponseModel";
import { shereheApis } from "./api";

class EventService {
    async getEvents(page: number, limit: number): Promise<PaginatedResponseModel<EventModel>> {
        const response = await shereheApis.get<PaginatedResponseModel<EventDto>>("/event", {
            params: { page: page, limit: limit }
        });

        return {
            ...response.data,
            data: response.data.data.map((eventDto) => mapEventsDtoToEvents(eventDto)),
        };
    }

    async getEventById(id: string): Promise<EventModel> {
        const response = await shereheApis.get<EventDto>(`/event/${id}`);

        return mapEventsDtoToEvents(response.data);
    }
}

export default new EventService();