import { mapEventsDtoToEvents, type CreateEventPayload, type EventDto, type EventModel } from "../models/event";
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

    async createEvent(payload: CreateEventPayload): Promise<EventModel> {
        const formData = new FormData();

        // Basic event details
        formData.append("event_name", payload.eventName);
        formData.append("event_description", payload.eventDescription);
        formData.append("event_location", payload.eventLocation);
        formData.append("start_date", payload.eventStartDate);
        formData.append("end_date", payload.eventEndDate);
        formData.append("organizer_id", payload.organizerId);
        formData.append("event_genre", JSON.stringify(payload.eventGenre));
        formData.append("scope", payload.scope);

        if (payload.eventUrl?.trim()) {
            formData.append("event_url", payload.eventUrl);
        }

        // Tickets
        const tickets = payload.tickets.map((ticket) => {
            const {
                ticketName,
                ticketPrice,
                ticketFor,
                ticketQuantity,
                scope,
                institutions,
                startDate,
                endDate,
            } = ticket;

            return {
                ticket_name: ticketName,
                ticket_price: ticketPrice,
                ticket_for: ticketFor,
                ticket_quantity: ticketQuantity,
                scope,
                institutions,
                start_date: startDate,
                end_date: endDate,
            };
        });

        formData.append("tickets", JSON.stringify(tickets));

        // Institutions
        if (payload.institutions?.length) {
            formData.append(
                "institutions",
                JSON.stringify(payload.institutions)
            );
        }

        // Optional event images
        if (payload.eventCardImage) {
            formData.append(
                "event_card_image",
                payload.eventCardImage,
                payload.eventCardImage.name
            );
        }

        if (payload.eventPosterImage) {
            formData.append(
                "event_poster_image",
                payload.eventPosterImage,
                payload.eventPosterImage.name
            );
        }

        if (payload.eventBannerImage) {
            formData.append(
                "event_banner_image",
                payload.eventBannerImage,
                payload.eventBannerImage.name
            );
        }

        if (payload.paymentType) {
            formData.append("payment_type", payload.paymentType);
        }

        if (payload.paybillNumber?.trim()) {
            formData.append(
                "paybill_number",
                payload.paybillNumber
            );
        }

        if (payload.accountReference?.trim()) {
            formData.append(
                "account_reference",
                payload.accountReference
            );
        }

        if (payload.tillNumber?.trim()) {
            formData.append("till_number", payload.tillNumber);
        }

        if (payload.sendMoneyPhoneNumber?.trim()) {
            formData.append(
                "send_money_phone",
                payload.sendMoneyPhoneNumber
            );
        }

        if (payload.pochiNumber?.trim()) {
            formData.append("pochi_number", payload.pochiNumber);
        }

        const response = await shereheApis.post<{
            data: { event: EventDto };
        }>("/event/", formData);

        return mapEventsDtoToEvents(response.data.data.event);
    }
}

export default new EventService();