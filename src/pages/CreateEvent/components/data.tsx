import type { PaymentType } from "../../../models/event";
import type { EventVisibility, EventVisibilityType, TicketType } from "../createEvent";

export const eventGenres: string[] = [
    'Meetup',
    'Party',
    'Official',
    'Physical',
    'Social',
    'Sports',
    'Conference',
    'Workshop',
    'Seminar',
    'Webinar',
    'Festival',
    'Exhibition',
    'Charity',
    'Gaming',
    'Music',
    'Arts & Culture',
    'Food & Drink',
    'Networking',
    'Education',
    'Technology',
    'Health & Wellness',
    'Other',
];

export const eventVisibilityOptions: EventVisibility[] = [
    {
        id: "1",
        value: "public",
        label: "Public - Anyone Can View"
    },
    {
        id: "2",
        value: "institution",
        label: "Institution - Specific Instituitions"
    },
    {
        id: "3",
        value: "private",
        label: "Private - Exclusive"
    },
];

export const ticketTypeOptions: { value: TicketType; label: string; ticketFor: number }[] = [
    { value: 'individual', label: 'Individual', ticketFor: 1 },
    { value: 'group2', label: 'Group of 2', ticketFor: 2 },
    { value: 'group3', label: 'Group of 3', ticketFor: 3 },
    { value: 'group4', label: 'Group of 4', ticketFor: 4 },
    { value: 'group5', label: 'Group of 5', ticketFor: 5 },
    { value: 'group6', label: 'Group of 6', ticketFor: 6 },
    { value: 'group7', label: 'Group of 7', ticketFor: 7 },
    { value: 'group8', label: 'Group of 8', ticketFor: 8 },
    { value: 'group9', label: 'Group of 9', ticketFor: 9 },
    { value: 'group10', label: 'Group of 10', ticketFor: 10 },
];

export const paymentOptions: { value: PaymentType; label: string }[] = [
    { value: 'paybill', label: 'Paybill' },
    { value: 'till', label: 'Till Number' },
    { value: 'sendMoney', label: 'Send Money' },
    { value: 'pochi', label: 'Pochi La Biashara' },
];

export const ticketVisibilityOptions: { value: EventVisibilityType; label: string }[] = [
    { value: 'public', label: 'Public - Anyone Can View' },
    { value: 'institution', label: 'Institution - Specific Instituitions' },
    { value: 'private', label: 'Private - Exclusive' },
];
