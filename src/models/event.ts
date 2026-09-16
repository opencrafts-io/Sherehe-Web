export interface EventModel {
    id: string;
    eventName: string;
    eventDescription: string;
    eventLocation: string;

    startDate: string;
    endDate: string;

    attendeeCount: number;
    organizerId: string;

    eventCardImage: string | null;
    eventPosterImage: string | null;
    eventBannerImage: string | null;
    eventUrl: string | null;

    eventGenre: string[] | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    scope: string;

    institutions: string[] | null;
}

export interface EventDto {
    id: string;
    event_name: string;
    event_description: string;
    event_location: string;

    start_date: string;
    end_date: string;

    attendee_count: number;
    organizer_id: string;

    event_card_image: string | null;
    event_poster_image: string | null;
    event_banner_image: string | null;
    event_url: string | null;

    event_genre: string[] | null;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    scope: string;

    institutions: string[] | null;
}

export function mapEventsDtoToEvents(dto: EventDto): EventModel {
    return {
        id: dto.id,
        eventName: dto.event_name,
        eventDescription: dto.event_description,
        eventLocation: dto.event_location,
        startDate: dto.start_date,
        endDate: dto.end_date,
        attendeeCount: dto.attendee_count,
        organizerId: dto.organizer_id,
        eventCardImage: dto.event_card_image,
        eventPosterImage: dto.event_poster_image,
        eventBannerImage: dto.event_banner_image,
        eventUrl: dto.event_url,
        eventGenre: dto.event_genre,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
        deletedAt: dto.deleted_at,
        scope: dto.scope,
        institutions: dto.institutions,
    };
}
