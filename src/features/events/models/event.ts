export interface EventModel {
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

export const events: EventModel[] = [
    {
        id: "evt-001",
        event_name: "Campus Party Night",
        event_description:
            "An exciting night of music, dancing, games, and great company for students.",
        event_location: "Daystar University, Athi River",
        start_date: "2026-08-22T18:00:00Z",
        end_date: "2026-08-22T23:30:00Z",
        attendee_count: 124,
        organizer_id: "org-001",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Party", "Social", "Music"],
        created_at: "2026-08-10T09:00:00Z",
        updated_at: "2026-08-10T09:00:00Z",
        deleted_at: null,
        scope: "institution",
        institutions: ["Daystar University"],
    },

    {
        id: "evt-002",
        event_name: "Tech & Innovation Summit",
        event_description:
            "A student-focused technology summit featuring talks, demonstrations, and networking opportunities.",
        event_location: "University of Nairobi, Chiromo Campus",
        start_date: "2026-08-24T09:00:00Z",
        end_date: "2026-08-24T16:00:00Z",
        attendee_count: 286,
        organizer_id: "org-002",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: "https://example.com/tech-summit",
        event_genre: ["Technology", "Education", "Networking"],
        created_at: "2026-08-08T10:30:00Z",
        updated_at: "2026-08-12T14:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-003",
        event_name: "Acoustic Evening",
        event_description:
            "Relax with live acoustic performances from talented student musicians and artists.",
        event_location: "Alliance Française, Nairobi",
        start_date: "2026-08-27T17:30:00Z",
        end_date: "2026-08-27T21:00:00Z",
        attendee_count: 78,
        organizer_id: "org-003",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Music", "Arts", "Social"],
        created_at: "2026-08-11T08:00:00Z",
        updated_at: "2026-08-11T08:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-004",
        event_name: "Inter-University Football Tournament",
        event_description:
            "Watch university teams compete in an exciting day of football and student activities.",
        event_location: "Kasarani Stadium, Nairobi",
        start_date: "2026-08-29T10:00:00Z",
        end_date: "2026-08-29T18:00:00Z",
        attendee_count: 542,
        organizer_id: "org-004",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Sports", "Competition", "Social"],
        created_at: "2026-08-05T11:00:00Z",
        updated_at: "2026-08-13T09:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-005",
        event_name: "Creative Arts Showcase",
        event_description:
            "A showcase celebrating student talent through photography, painting, poetry, and visual arts.",
        event_location: "Kenyatta University, Main Campus",
        start_date: "2026-09-02T12:00:00Z",
        end_date: "2026-09-02T17:00:00Z",
        attendee_count: 96,
        organizer_id: "org-005",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Arts", "Culture", "Exhibition"],
        created_at: "2026-08-12T12:00:00Z",
        updated_at: "2026-08-12T12:00:00Z",
        deleted_at: null,
        scope: "institution",
        institutions: ["Kenyatta University"],
    },

    {
        id: "evt-006",
        event_name: "Startup Networking Mixer",
        event_description:
            "Meet fellow entrepreneurs, developers, designers, and aspiring founders in a relaxed networking environment.",
        event_location: "iHub, Nairobi",
        start_date: "2026-09-04T17:00:00Z",
        end_date: "2026-09-04T20:30:00Z",
        attendee_count: 143,
        organizer_id: "org-006",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: "https://example.com/startup-mixer",
        event_genre: ["Business", "Networking", "Technology", "Fun", "Adventure", "Education", "Studying"],
        created_at: "2026-08-09T15:00:00Z",
        updated_at: "2026-08-14T10:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-007",
        event_name: "Movie Night Under the Stars",
        event_description:
            "Enjoy a relaxing outdoor movie experience with friends, snacks, and music.",
        event_location: "USIU-Africa, Nairobi",
        start_date: "2026-09-06T18:30:00Z",
        end_date: "2026-09-06T22:30:00Z",
        attendee_count: 187,
        organizer_id: "org-007",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Movies", "Social", "Entertainment"],
        created_at: "2026-08-13T09:00:00Z",
        updated_at: "2026-08-13T09:00:00Z",
        deleted_at: null,
        scope: "institution",
        institutions: ["USIU-Africa"],
    },

    {
        id: "evt-008",
        event_name: "Student Wellness Walk",
        event_description:
            "Take a break from classes and join fellow students for a fun outdoor walk and social afternoon.",
        event_location: "Karura Forest, Nairobi",
        start_date: "2026-09-08T08:00:00Z",
        end_date: "2026-09-08T12:00:00Z",
        attendee_count: 65,
        organizer_id: "org-008",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Wellness", "Outdoor", "Social"],
        created_at: "2026-08-14T08:30:00Z",
        updated_at: "2026-08-14T08:30:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-009",
        event_name: "Debate Championship",
        event_description:
            "Watch some of the best university debaters compete in a day of arguments, ideas, and intellectual competition.",
        event_location: "Strathmore University, Nairobi",
        start_date: "2026-09-10T09:00:00Z",
        end_date: "2026-09-10T17:00:00Z",
        attendee_count: 211,
        organizer_id: "org-009",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Education", "Competition", "Debate"],
        created_at: "2026-08-07T13:00:00Z",
        updated_at: "2026-08-12T16:00:00Z",
        deleted_at: null,
        scope: "institution",
        institutions: ["Strathmore University"],
    },

    {
        id: "evt-010",
        event_name: "Cultural Festival",
        event_description:
            "Celebrate different cultures through food, music, fashion, dance, and performances from students.",
        event_location: "Moi University, Eldoret",
        start_date: "2026-09-12T10:00:00Z",
        end_date: "2026-09-12T19:00:00Z",
        attendee_count: 438,
        organizer_id: "org-010",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Culture", "Music", "Food", "Social"],
        created_at: "2026-08-06T10:00:00Z",
        updated_at: "2026-08-13T12:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },

    {
        id: "evt-011",
        event_name: "Gaming Tournament",
        event_description:
            "Compete against fellow gamers in a university gaming tournament featuring multiple competitive games.",
        event_location: "JKUAT, Juja",
        start_date: "2026-09-15T11:00:00Z",
        end_date: "2026-09-15T20:00:00Z",
        attendee_count: 174,
        organizer_id: "org-011",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Gaming", "Competition", "Entertainment"],
        created_at: "2026-08-10T16:00:00Z",
        updated_at: "2026-08-14T11:30:00Z",
        deleted_at: null,
        scope: "institution",
        institutions: ["JKUAT"],
    },

    {
        id: "evt-012",
        event_name: "End of Semester Bash",
        event_description:
            "Celebrate the end of the semester with music, food, dancing, games, and an unforgettable night with friends.",
        event_location: "Nairobi",
        start_date: "2026-09-18T18:00:00Z",
        end_date: "2026-09-19T00:00:00Z",
        attendee_count: 327,
        organizer_id: "org-012",
        event_card_image: null,
        event_poster_image: null,
        event_banner_image: null,
        event_url: null,
        event_genre: ["Party", "Music", "Social", "Entertainment"],
        created_at: "2026-08-11T14:00:00Z",
        updated_at: "2026-08-15T09:00:00Z",
        deleted_at: null,
        scope: "public",
        institutions: null,
    },
];