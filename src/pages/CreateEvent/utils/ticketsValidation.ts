import dayjs from "dayjs";
import type { TicketCreationModel } from "../../../models/ticket";

export type TicketFieldErrors = {
    ticketName?: string;
    ticketPrice?: string;
    ticketQuantity?: string;
    ticketFor?: string;
    scope?: string;
    institutions?: string;
    startDate?: string;
    endDate?: string;
    eventStartDateError?: string,
    eventEndDateError?: string,
};

export function validateTicket(
    ticket: TicketCreationModel,
    eventStartDate?: string,
    eventEndDate?: string,
): TicketFieldErrors {
    const errors: TicketFieldErrors = {};

    if (!ticket.ticketName?.trim()) {
        errors.ticketName = "Ticket name is required.";
    }

    if (
        !Number.isFinite(ticket.ticketPrice) ||
        ticket.ticketPrice <= 0
    ) {
        errors.ticketPrice =
            "Enter a valid price greater than zero.";
    }

    if (
        !Number.isFinite(ticket.ticketQuantity) ||
        ticket.ticketQuantity <= 0
    ) {
        errors.ticketQuantity =
            "Enter a valid quantity greater than zero.";
    }

    if (
        ticket.ticketFor == null ||
        !Number.isFinite(ticket.ticketFor) ||
        ticket.ticketFor <= 0
    ) {
        errors.ticketFor = "Please select a ticket type.";
    }

    if (!ticket.scope) {
        errors.scope = "Please select a ticket scope.";
    }

    if (
        ticket.scope === "institution" &&
        (!ticket.institutions || ticket.institutions.length === 0)
    ) {
        errors.institutions =
            "Select at least one institution.";
    }

    const start = ticket.startDate
        ? dayjs(ticket.startDate)
        : null;

    const end = ticket.endDate
        ? dayjs(ticket.endDate)
        : null;


    const eventStart = eventStartDate
        ? dayjs(eventStartDate)
        : null;

    const eventEnd = eventEndDate
        ? dayjs(eventEndDate)
        : null;

    if (!start || !start.isValid()) {
        errors.startDate =
            "Validity start date is required.";
    }

    if (!end || !end.isValid()) {
        errors.endDate =
            "Validity end date is required.";
    }

    if (
        start?.isValid() &&
        end?.isValid()
    ) {
        if (start.isAfter(end)) {
            errors.startDate =
                "Start date must be before to the end date.";
        }

        if (eventStart != null && (start.isAfter(eventEnd) || start.isBefore(eventStart))) {
            errors.eventStartDateError = "Start date must be within the event dates";
        }

        if (end.isBefore(start)) {
            errors.endDate =
                "End date must be after or equal to the start date.";
        }

        if (eventEnd != null && (end.isAfter(eventEnd) || end.isBefore(eventStart))) {
            errors.eventEndDateError =
                "End date must be within the event dates";
        }
    }

    return errors;
}

