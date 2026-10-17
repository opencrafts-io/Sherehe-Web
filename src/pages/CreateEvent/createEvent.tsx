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
import type { TicketCreationModel, TicketSubmissionModel } from "../../models/ticket";
import { validateTicket } from "../../utils/EventsUtils/CreateEventPageValidations";
import PaymentMethod, { type PaymentMethodProps } from "./steps/paymentMethod";
import type { CreateEventPayload, PaymentType } from "../../models/event";
import useUserStore from "../../stores/userStore";
import useEventsStore from "../../stores/eventsStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/ui/appSnackbar";

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
    const [hasAttemptedToContinue, setHasAttemptedToContinue] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const nextPage = async () => {
        if (currentPage > steps.length || isLoading) return;

        setHasAttemptedToContinue(true);

        if (currentPage === 1) {
            if (!validateAboutEvent()) return;
        }

        if (currentPage === 2) {
            if (!validateEventDescription()) return;
        }

        if (currentPage === 4) {
            if (!eventTicketType) return;

            if (eventTicketType === "free") {
                if (!validateFreeTicket()) return;

                await submitEvent();
                return;
            }

            if (!validatePaidTickets()) return;
        }

        if (currentPage === 5) {
            if (!validatePaymentDetails()) return;

            await submitEvent();
            return;
        }

        setHasAttemptedToContinue(false);
        setCurrentPage((page) => page + 1);
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

    // Payment Section
    const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
    const [paybillNumber, setPaybillNumber] = useState<string>("");
    const [accountReference, setAccountReference] = useState<string>("");
    const [tillNumber, setTillNumber] = useState<string>("");
    const [sendMoneyNumber, setSendMoneyNumber] = useState<string>("");
    const [pochiNumber, setPochiNumber] = useState<string>("");
    const paymentOptions: { value: PaymentType; label: string }[] = [
        { value: 'paybill', label: 'Paybill' },
        { value: 'till', label: 'Till Number' },
        { value: 'sendMoney', label: 'Send Money' },
        { value: 'pochi', label: 'Pochi La Biashara' },
    ];
    const paymentMethodProps: PaymentMethodProps = {
        paymentType,
        paybillNumber,
        accountReference,
        tillNumber,
        sendMoneyNumber,
        pochiNumber,
        hasAttemptedToContinue,
        setPaymentType,
        setPaybillNumber,
        setAccountReference,
        setTillNumber,
        setSendMoneyNumber,
        setPochiNumber,
        sxVariable,
        paymentOptions
    };

    const validatePaymentDetails = () => {
        if (!paymentType) return false;

        switch (paymentType) {
            case "paybill":
                return Boolean(
                    paybillNumber.trim() &&
                    accountReference.trim(),
                );

            case "till":
                return Boolean(tillNumber.trim());

            case "sendMoney":
                return Boolean(sendMoneyNumber.trim());

            case "pochi":
                return Boolean(pochiNumber.trim());

            default:
                return false;
        }
    };

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
        ...(eventTicketType === "paid"
            ? [
                {
                    id: 5,
                    title: 'Payment',
                },
            ]
            : []),
    ];

    const userId = useUserStore((state) => state.user?.id);
    const { isLoading, error, createEvent } = useEventsStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            createEvent: state.createEvent,
        }))
    );
    const navigate = useNavigate();

    const submitEvent = async () => {
        if (!userId || !eventTicketType || isLoading) return;

        const tickets: TicketSubmissionModel[] =
            eventTicketType === "free"
                ? [
                    {
                        ticketName: "Free Ticket",
                        ticketPrice: 0,
                        ticketQuantity: Number(ticketQuantity),
                        ticketFor: 1,
                        scope: "public",
                        institutions: [],
                        startDate: eventStartDateTime,
                        endDate: eventEndDateTime,
                    },
                ]
                : paidTicketsAdded.map((ticket) => ({
                    ticketName: ticket.ticketName,
                    ticketPrice: ticket.ticketPrice,
                    ticketQuantity: ticket.ticketQuantity,
                    ticketFor: ticket.ticketFor!,
                    scope: ticket.scope,
                    institutions:
                        ticket.scope === "institution"
                            ? ticket.institutions?.map(
                                (institution) => institution.institutionId
                            ) ?? []
                            : [],
                    startDate: ticket.startDate,
                    endDate: ticket.endDate,
                }));

        const eventData: CreateEventPayload = {
            eventName,
            eventDescription,
            eventLocation,
            eventStartDate: eventStartDateTime,
            eventEndDate: eventEndDateTime,
            organizerId: userId,
            eventGenre: selectedGenres,
            eventCardImage: cardImage,
            eventPosterImage: posterImage,
            eventBannerImage: bannerImage,
            tickets,
            institutions:
                eventVisibility === "institution"
                    ? selectedInstitutions.map(
                        (institution) => institution.institutionId
                    )
                    : [],
            scope: eventVisibility,
            paybillNumber,
            accountReference,
            tillNumber,
            sendMoneyPhoneNumber: sendMoneyNumber,
            pochiNumber,
        };

        const success = await createEvent(
            eventData,
            paymentType
        );

        if (success) {
            navigate("/dashboard");
        } else {
            setSnackbarOpen(true);
        }

    };

    return (
        <>
            <div className="mx-auto my-4 w-full max-w-7xl px-3 sm:my-6 sm:px-6 lg:px-8 lg:py-6">
                <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-100 p-4 sm:p-6">
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                            Create Event
                        </h1>

                        <BookingStepper currentStep={currentPage} steps={steps} />
                    </div>

                    <div className="flex flex-col p-4 sm:p-6 lg:p-8">
                        {currentPage === 1 && <AboutEvent {...aboutEventProps} />}
                        {currentPage === 2 && <EventDescription {...eventDescriptionProps} />}
                        {currentPage === 3 && <ImageUpload {...imageUploadProps} />}
                        {currentPage === 4 && <TicketTypes {...ticketTypesProps} />}
                        {currentPage === 5 && <PaymentMethod {...paymentMethodProps} />}
                    </div>

                    <div className="flex justify-between gap-3 border-t border-gray-200 bg-gray-100 p-4 sm:p-6">
                        <button
                            type="button"
                            onClick={previousPage}
                            className={
                                currentPage === 1
                                    ? "invisible"
                                    : "rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"
                            }
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            onClick={nextPage}
                            disabled={isLoading}
                            className="ml-auto rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading
                                ? "Creating Event..."
                                : currentPage === 4 && eventTicketType === "free"
                                    ? "Create Event"
                                    : currentPage === 5
                                        ? "Create Event"
                                        : "Continue"}
                        </button>

                        <AppSnackbar
                            open={snackbarOpen && Boolean(error)}
                            message={error ?? ""}
                            onClose={() => setSnackbarOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateEvent;