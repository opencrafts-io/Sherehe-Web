import dayjs from "dayjs";
import type { Institution } from "../../../models/institution";
import { validateTicket } from "./ticketsValidation";
import type { TicketCreationModel } from "../../../models/ticket";
import type { PaymentType } from "../../../models/event";
import type { EventTicketType, EventVisibilityType } from "../components/data";

export const validateAboutEvent = (eventName: string, eventLocation: string, eventStartDateTime: string, eventEndDateTime: string, eventVisibility: EventVisibilityType, selectedInstitutions: Institution[]) => {
    const isEventNameValid = eventName.trim().length > 0;
    const isLocationValid = eventLocation.trim().length > 0;

    const startDate = dayjs(eventStartDateTime);
    const endDate = dayjs(eventEndDateTime);

    const isStartDateValid =
        eventStartDateTime !== "" && startDate.isValid() && startDate.isAfter(dayjs());

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

export const validateEventDescription = (eventDescription: string, selectedGenres: string[]) => {
    const isEventDescriptionValid = eventDescription.trim().length > 0;
    const areGenresValid = selectedGenres.length > 0;

    return isEventDescriptionValid && areGenresValid;
};

export const validateFreeTicket = (ticketQuantity: string, eventTicketType: EventTicketType | null) => {
    const isQuantityValid =
        /^\d+$/.test(ticketQuantity) &&
        Number(ticketQuantity) > 0 &&
        Number.isSafeInteger(Number(ticketQuantity));

    const eventTypeValid = eventTicketType !== null;

    return isQuantityValid && eventTypeValid;
};

export const validatePaidTickets = (paidTicketsAdded: TicketCreationModel[], eventStartDateTime: string, eventEndDateTime: string) => {
    if (paidTicketsAdded.length === 0) return false;

    return paidTicketsAdded.every((ticket) => {
        const errors = validateTicket(ticket, eventStartDateTime, eventEndDateTime);

        return Object.keys(errors).length === 0;
    });
};

export const validatePaymentDetails = (paymentType: PaymentType | null, paybillNumber: string, accountReference: string, tillNumber: string, sendMoneyNumber: string, pochiNumber: string) => {
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