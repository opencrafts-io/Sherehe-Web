import { useState } from "react";
import BookingStepper from "../../components/ui/bookingStepper";
import { type AlertColor } from "@mui/material";
import AboutEvent, { type AboutEventProps } from "./steps/aboutEvent";
import EventDescription, { type EventDescriptionProps } from "./steps/eventDescription";
import ImageUpload, { type ImageUploadProps } from "./steps/imageUpload";
import type { Institution } from "../../models/institution";
import type { TicketTypesProps } from "./steps/ticketTypes";
import TicketTypes from "./steps/ticketTypes";
import type { TicketCreationModel, TicketSubmissionModel } from "../../models/ticket";
import PaymentMethod, { type PaymentMethodProps } from "./steps/paymentMethod";
import type { CreateEventPayload, PaymentType } from "../../models/event";
import useUserStore from "../../stores/userStore";
import useEventsStore from "../../stores/eventsStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../../components/ui/appSnackbar";
import { eventGenres, eventVisibilityOptions, getEventSteps, paymentOptions, sxVariable, ticketTypeOptions, ticketVisibilityOptions, type EventTicketType, type EventVisibilityType } from "./components/data";
import { validateAboutEvent, validateEventDescription, validateFreeTicket, validatePaidTickets, validatePaymentDetails } from "./utils/eventValidation";

function CreateEvent() {
    const [currentPage, setCurrentPage] = useState(1);
    const [hasAttemptedToContinue, setHasAttemptedToContinue] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<AlertColor>("error");
    const nextPage = async () => {
        if (currentPage > steps.length || isLoading) return;

        setHasAttemptedToContinue(true);

        if (currentPage === 1) {
            if (!validateAboutEvent(eventName, eventLocation, eventStartDateTime, eventEndDateTime, eventVisibility, selectedInstitutions)) return;
        }

        if (currentPage === 2) {
            if (!validateEventDescription(eventDescription, selectedGenres)) return;
        }

        if (currentPage === 4) {
            if (!eventTicketType) return;

            if (eventTicketType === "free") {
                if (!validateFreeTicket(ticketQuantity, eventTicketType)) return;

                await submitEvent();
                return;
            }

            if (!validatePaidTickets(paidTicketsAdded, eventStartDateTime, eventEndDateTime)) return;
        }

        if (currentPage === 5) {
            if (!validatePaymentDetails(paymentType, paybillNumber, accountReference, tillNumber, sendMoneyNumber, pochiNumber)) return;

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

    //About Event Details Stepper   
    const [eventName, setEventName] = useState("");
    const [eventStartDateTime, setEventStartDateTime] = useState("");
    const [eventEndDateTime, setEventEndDateTime] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventVisibility, setEventVisibility] = useState<EventVisibilityType>("public");
    const [selectedInstitutions, setSelectedInstitutions] = useState<Institution[]>([]);


    //Event Genre and description Stepper
    const [eventDescription, setEventDescription] = useState("");

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

    // Image Upload Section
    const [cardImage, setCardImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [posterImage, setPosterImage] = useState<File | null>(null);

    //Ticket Types Section
    const [eventTicketType, setEventTicketType] = useState<EventTicketType | null>(null);
    const [ticketQuantity, setTicketQuantity] = useState<string>("");
    const [paidTicketsAdded, setPaidTicketsAdded] = useState<TicketCreationModel[]>([]);
    const handleTicketAdded = (ticket: TicketCreationModel) => {
        setPaidTicketsAdded((prevTickets) => [...prevTickets, ticket]);
    };
    const handleEventTypeChange = (type: EventTicketType) => {
        setEventTicketType(type);
        setPaidTicketsAdded([]);
        setTicketQuantity("");
        setPaymentType(null);
        setPaybillNumber("");
        setAccountReference("");
        setTillNumber("");
        setPochiNumber("");
        setSendMoneyNumber("");
    };
    const handleEventSelectedInstitutions = (institutions: Institution[]) => {
        setSelectedInstitutions(institutions);

        if (eventTicketType === 'free' || eventVisibility !== 'institution' || paidTicketsAdded.length === 0) return;

        const selectedIds = new Set(institutions.map((inst) => inst.institutionId));

        const updatedTickets = paidTicketsAdded.map((ticket) => ({
            ...ticket,
            institutions: ticket.institutions ? ticket.institutions.filter((ticketInst) =>
                selectedIds.has(ticketInst.institutionId)
            ) : null,
        }));

        setPaidTicketsAdded(updatedTickets);
    };
    // Payment Section
    const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
    const [paybillNumber, setPaybillNumber] = useState<string>("");
    const [accountReference, setAccountReference] = useState<string>("");
    const [tillNumber, setTillNumber] = useState<string>("");
    const [sendMoneyNumber, setSendMoneyNumber] = useState<string>("");
    const [pochiNumber, setPochiNumber] = useState<string>("");

    const steps = getEventSteps(eventTicketType);
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
            setSnackbarMessage("Event created successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Navigate after showing the notification
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } else {
            setSnackbarMessage(error ?? "Failed to create event. Please try again.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }

    };

    //props
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
        handleEventSelectedInstitutions,
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

    const imageUploadProps: ImageUploadProps = {
        cardImage,
        bannerImage,
        posterImage,
        setCardImage,
        setBannerImage,
        setPosterImage,
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
        eventIsInstutionVisibility: eventVisibility == 'institution',
        eventsInstitutions: selectedInstitutions,
    };

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
        paymentOptions,
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
                            open={snackbarOpen}
                            message={snackbarMessage}
                            severity={snackbarSeverity}
                            onClose={() => setSnackbarOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateEvent;