import { useState } from "react";
import BookingStepper, { type Steps } from "../../components/ui/bookingStepper";
import { type SxProps, type Theme } from "@mui/material";
import AboutEvent, { type AboutEventProps } from "./steps/aboutEvent";
import EventDescription, { type EventDescriptionProps } from "./steps/eventDescription";
import ImageUpload, { type ImageUploadProps } from "./steps/imageUpload";
import type { Institution } from "../../models/institution";
import dayjs from "dayjs";
import type { TicketTypesProps } from "./steps/ticketTypes";
import TicketTypes from "./steps/ticketTypes";
import type { TicketCreationModel } from "../../models/ticket";
import { validateTicket } from "../../utils/EventsUtils/paidTicketValidation";

export interface EventVisibility {
    id: string;
    value: EventVisibilityType;
    label: string;
}

export type EventVisibilityType = 'public' | 'institution' | 'private';

export type EventTicketType = 'free' | 'paid';

export interface TicketInfo {
    ticketName: string;
    ticketPrice: number;
    ticketQuantity: number;
    ticketType: string;
    ticketScope: string;
    ticketValidity: number;
}

export type TicketType = 'individual' | 'group2' | 'group3' | 'group4' | 'group5' | 'group6' | 'group7' | 'group8' | 'group9' | 'group10';


function CreateEvent() {
    const [currentPage, setCurrentPage] = useState(1);
    const steps: Steps[] = [
        {
            id: 1,
            title: 'About Event',
        },
        {
            id: 2,
            title: 'Description',
        },
        {
            id: 3,
            title: 'Media',
        },
        {
            id: 4,
            title: 'Tickets',
        },
        {
            id: 5,
            title: 'Payment',
        },
    ];
    const [hasAttemptedToContinue, setHasAttemptedToContinue] = useState(false);
    const nextPage = () => {
        if (currentPage > steps.length) return;

        setHasAttemptedToContinue(true);

        if (currentPage === 1) {
            if (!validateAboutEvent()) return;
        }

        if (currentPage === 2) {
            if (!validateEventDescription()) return;
        }

        if (currentPage === 4) {
            if (!eventTicketType) return;
            if (eventTicketType === "free" && !validateFreeTicket()) return;
            if (eventTicketType === "paid" && !validatePaidTickets()) return;
        }

        setHasAttemptedToContinue(false);
        setCurrentPage(currentPage + 1);

    };
    const previousPage = () => {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const sxVariable: SxProps<Theme> = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'var(--color-primary-70)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--color-primary)',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
        },

    };
    //About Event Details Stepper
    const eventVisibilityOptions: EventVisibility[] = [
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
    const [eventName, setEventName] = useState("");
    const [eventStartDateTime, setEventStartDateTime] = useState("");
    const [eventEndDateTime, setEventEndDateTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventVisibility, setEventVisibility] = useState<EventVisibilityType>("public");
    const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);

    const aboutEventProps: AboutEventProps = {
        sxVariable,
        eventVisibilityOptions,
        eventName,
        eventStartDateTime,
        eventEndDateTime,
        eventLocation,
        eventVisibility,
        selectedInstitutions,
        hasAttemptedToContinue,
        setEventName,
        setEventStartDateTime,
        setEventEndDateTime,
        setEventLocation,
        setEventVisibility,
        setSelectedInstitutions,
    };

    const validateAboutEvent = () => {
        const isEventNameValid = eventName.trim().length > 0;
        const isLocationValid = eventLocation.trim().length > 0;

        const startDate = dayjs(eventStartDateTime);
        const endDate = dayjs(eventEndDateTime);

        const isStartDateValid =
            eventStartDateTime !== "" && startDate.isValid();

        const isEndDateValid =
            eventEndDateTime !== "" && endDate.isValid();

        const isDateRangeValid =
            isStartDateValid &&
            isEndDateValid &&
            endDate.isAfter(startDate);

        const areInstitutionsValid =
            eventVisibility !== "institution" ||
            selectedInstitutions.length > 0;

        return (
            isEventNameValid &&
            isLocationValid &&
            isDateRangeValid &&
            areInstitutionsValid
        );
    };

    //Event Genre and description Stepper
    const [eventDescription, setEventDescription] = useState("");
    const eventGenres: string[] = [
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
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [tempGenres, setTempGenres] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const chooseGenres = (genre: string) => {
        setTempGenres((currentGenres) => {
            if (currentGenres.includes(genre)) {
                return currentGenres.filter((item) => item !== genre);
            }

            return [...currentGenres, genre];
        });
    };
    const openDialogue = () => {
        setTempGenres(selectedGenres);
        setDialogOpen(true);
    };
    const applyGenres = () => {
        setSelectedGenres(tempGenres);
        setDialogOpen(false);
    };
    const clearGenres = () => {
        setTempGenres([]);
    };
    const removeGenre = (genre: string) => {
        setSelectedGenres((currentGenres) =>
            currentGenres.filter((item) => item !== genre)
        );
    };
    const closeDialogue = () => {
        setDialogOpen(false);
    };

    const validateEventDescription = () => {
        const isEventDescriptionValid = eventDescription.trim().length > 0;
        const areGenresValid = selectedGenres.length > 0;

        return isEventDescriptionValid && areGenresValid;
    };

    const eventDescriptionProps: EventDescriptionProps = {
        chooseGenres,
        selectedGenres,
        eventGenres,
        removeGenre,
        dialogOpen,
        closeDialogue,
        clearGenres,
        applyGenres,
        openDialogue,
        tempGenres,
        sxVariable,
        hasAttemptedToContinue,
        eventDescription,
        setEventDescription,
    };

    // Image Upload Section
    const [cardImage, setCardImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [posterImage, setPosterImage] = useState<File | null>(null);

    const imageUploadProps: ImageUploadProps = {
        cardImage,
        bannerImage,
        posterImage,
        setCardImage,
        setBannerImage,
        setPosterImage,
    };

    //Ticket Types Section
    const [eventTicketType, setEventTicketType] = useState<EventTicketType | null>(null);
    const [ticketQuantity, setTicketQuantity] = useState<string>("");
    const [paidTicketsAdded, setPaidTicketsAdded] = useState<TicketCreationModel[]>([]);
    const handleTicketAdded = (ticket: TicketCreationModel) => {
        setPaidTicketsAdded((prevTickets) => [...prevTickets, ticket]);
    };
    const ticketTypeOptions: { value: TicketType; label: string; ticketFor: number }[] = [
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

    const ticketVisibilityOptions: { value: EventVisibilityType; label: string }[] = [
        { value: 'public', label: 'Public - Anyone Can View' },
        { value: 'institution', label: 'Institution - Specific Instituitions' },
        { value: 'private', label: 'Private - Exclusive' },
    ];

    const handleEventTypeChange = (type: EventTicketType) => {
        setEventTicketType(type);
        if (type === "free") {
            setPaidTicketsAdded([]);
        }
        if (type === "paid") {
            setTicketQuantity("");
        }
    };


    const ticketTypesProps: TicketTypesProps = {
        eventTicketType,
        handleEventTypeChange,
        ticketQuantity,
        setTicketQuantity,
        hasAttemptedToContinue,
        paidTicketsAdded,
        setPaidTicketsAdded,
        handleTicketAdded,
        sxVariable,
        ticketTypeOptions,
        ticketVisibilityOptions,
        eventStartDateTime,
        eventEndDateTime,
    };

    const validateFreeTicket = () => {
        const isQuantityValid =
            /^\d+$/.test(ticketQuantity) &&
            Number(ticketQuantity) > 0 &&
            Number.isSafeInteger(Number(ticketQuantity));

        const eventTypeValid = eventTicketType !== null;

        return isQuantityValid && eventTypeValid;
    };

    const validatePaidTickets = () => {
        if (paidTicketsAdded.length === 0) return false;

        return paidTicketsAdded.every((ticket) => {
            const errors = validateTicket(ticket);

            return Object.keys(errors).length === 0;
        });
    };



    return (
        <>
            <div className="flex flex-col my-6 mx-10 gap-3 border border-gray-200 rounded-lg">
                <div className="flex flex-col p-6 gap-3 border border-gray-200 bg-gray-100 ">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Create Event</h1>
                    <BookingStepper currentStep={currentPage} steps={steps} />
                </div>
                <div className="flex flex-col p-6">
                    {currentPage === 1 && (
                        <AboutEvent {...aboutEventProps} />
                    )}
                    {currentPage === 2 && (
                        <EventDescription {...eventDescriptionProps} />
                    )}
                    {currentPage === 3 && (
                        <ImageUpload {...imageUploadProps} />
                    )}
                    {currentPage === 4 && (
                        <TicketTypes {...ticketTypesProps} />
                    )}
                </div>
                <div className="flex justify-between p-6 border border-gray-200 bg-gray-100">
                    <button
                        type="button"
                        onClick={previousPage}
                        className={currentPage === 1 ? "hidden" : "rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={nextPage}
                        className="ml-auto rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700"
                    >
                        {currentPage === 4 && eventTicketType === "free" ? "Create Event" : "Continue"}
                    </button>
                </div>

            </div>

        </>
    );
}

export default CreateEvent;