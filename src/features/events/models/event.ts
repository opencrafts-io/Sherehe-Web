export interface Event {
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