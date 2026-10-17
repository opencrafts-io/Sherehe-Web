import {
    Button,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    TextField,
    type SxProps,
    type Theme,
} from "@mui/material";

import {
    faTicket,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

import type { TicketCreationModel } from "../../../models/ticket";
import type { EventVisibilityType, TicketType } from "../createEvent";
import { useState } from "react";
import type { Institution } from "../../../models/institution";
import type { InstitutionDialogProps } from "./institutionDialog";
import InstitutionDialog from "./institutionDialog";
import { isEventMultiday } from "../../../utils/EventsUtils/eventUtils";
import { validateTicket } from "../../../utils/EventsUtils/paidTicketValidation";

export interface PaidTicketCreationProps {
    sxVariable: SxProps<Theme>;
    paidTicketsAdded: TicketCreationModel[];
    setPaidTicketsAdded: (tickets: TicketCreationModel[]) => void;
    ticketTypeOptions: {
        value: TicketType;
        label: string;
        ticketFor: number;
    }[];
    ticketVisibilityOptions: {
        value: EventVisibilityType;
        label: string;
    }[];
    eventStartDateTime: string;
    eventEndDateTime: string;
    hasAttemptedToContinue: boolean;
}

function createEmptyTicket(isMultiDayEvent: boolean, eventStartDateTime: string, eventEndDateTime: string): TicketCreationModel {
    const defaultStartDate = !isMultiDayEvent ? eventStartDateTime : "";
    const defaultEndDate = !isMultiDayEvent ? eventEndDateTime : "";

    return {
        ticketName: "",
        ticketPrice: 0,
        ticketFor: 1,
        ticketQuantity: 1,
        scope: "public",
        institutions: null,
        startDate: defaultStartDate,
        endDate: defaultEndDate,
    };
}

function PaidTicketCreation({
    sxVariable,
    paidTicketsAdded,
    setPaidTicketsAdded,
    ticketTypeOptions,
    ticketVisibilityOptions,
    eventStartDateTime,
    eventEndDateTime,
    hasAttemptedToContinue,
}: PaidTicketCreationProps) {
    const isMultiDayEvent = isEventMultiday(eventStartDateTime, eventEndDateTime);
    const tickets =
        paidTicketsAdded.length > 0
            ? paidTicketsAdded
            : [createEmptyTicket(isMultiDayEvent, eventStartDateTime, eventEndDateTime)];

    const handleAddTicket = () => {
        setPaidTicketsAdded([...tickets, createEmptyTicket(isMultiDayEvent, eventStartDateTime, eventEndDateTime)]);
    };

    const handleRemoveTicket = (index: number) => {
        if (tickets.length <= 1) return;

        setPaidTicketsAdded(
            tickets.filter((_, ticketIndex) => ticketIndex !== index),
        );
    };

    // Temporary selection while the dialog is open.
    const [institutionDialogOpen, setInstitutionDialogOpen] = useState(false);
    const [activeTicketIndex, setActiveTicketIndex] = useState<number | null>(null);
    const [pendingInstitutions, setPendingInstitutions] = useState<Institution[]>([]);

    const updateTicket = <K extends keyof TicketCreationModel>(
        index: number,
        field: K,
        value: TicketCreationModel[K],
    ) => {
        const updatedTickets = [...tickets];

        updatedTickets[index] = {
            ...updatedTickets[index],
            [field]: value,
        };

        setPaidTicketsAdded(updatedTickets);
    };

    const handleOpenInstitutionDialog = (index: number) => {
        setActiveTicketIndex(index);

        // Load the current ticket's institution selection.
        setPendingInstitutions(tickets[index].institutions ?? []);

        setInstitutionDialogOpen(true);
    };

    const handleInstitutionToggle = (institution: Institution) => {
        setPendingInstitutions((previous) =>
            previous.some(
                (inst) => inst.institutionId === institution.institutionId,
            )
                ? previous.filter(
                    (inst) =>
                        inst.institutionId !== institution.institutionId,
                )
                : [...previous, institution],
        );
    };

    const handleConfirmInstitutions = () => {
        if (activeTicketIndex !== null) {
            updateTicket(
                activeTicketIndex,
                "institutions",
                pendingInstitutions,
            );
        }

        setInstitutionDialogOpen(false);
        setActiveTicketIndex(null);
    };

    const handleCloseInstitutionDialog = () => {
        setInstitutionDialogOpen(false);
        setActiveTicketIndex(null);
    };

    const institutionDialogProps: InstitutionDialogProps = {
        institutionDialogOpen,
        pendingInstitutions,
        handleCloseInstitutionDialog,
        handleConfirmInstitutions,
        handleInstitutionToggle,
    };

    const getTicketErrors = (ticket: TicketCreationModel) =>
        validateTicket(ticket);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">
                            Configure Your Tickets
                        </h4>

                        <p className="mt-1 text-sm text-gray-600">
                            Set the price, availability, and sales period
                            for each ticket type.
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                        {tickets.length} Ticket
                        {tickets.length === 1 ? "" : " Types"}
                    </span>
                </div>

                <div className="mt-6 space-y-5">
                    {tickets.map((ticket, index) => {
                        const errors = getTicketErrors(ticket);

                        return (
                            <Paper
                                key={index}
                                variant="outlined"
                                sx={{
                                    p: { xs: 2, sm: 3 },
                                    borderRadius: 3,
                                    borderColor: "grey.300",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                                            <FontAwesomeIcon
                                                icon={faTicket}
                                                className="text-primary" />
                                        </div>

                                        <div>
                                            <h5 className="font-semibold text-gray-900">
                                                Ticket {index + 1}
                                            </h5>

                                            <p className="text-sm text-gray-500">
                                                Ticket details and pricing
                                            </p>
                                        </div>
                                    </div>

                                    {tickets.length > 1 && (
                                        <IconButton
                                            aria-label={`Remove ticket ${index + 1}`}
                                            onClick={() => handleRemoveTicket(index)}
                                            color="error"
                                            size="small"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </IconButton>
                                    )}
                                </div>

                                <Divider sx={{ my: 3 }} />

                                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor={`ticket-name-${index}`}
                                            className="mb-2 block text-sm font-bold text-gray-900"
                                        >
                                            Ticket Name
                                        </label>

                                        <TextField
                                            id={`ticket-name-${index}`}
                                            fullWidth
                                            sx={sxVariable}
                                            value={ticket.ticketName}
                                            onChange={(event) => updateTicket(
                                                index,
                                                "ticketName",
                                                event.target.value
                                            )}
                                            placeholder="e.g. Early Bird, General Admission"
                                            error={hasAttemptedToContinue && Boolean(errors.ticketName)}
                                            helperText={hasAttemptedToContinue && errors.ticketName ? errors.ticketName : " "}
                                        />

                                    </div>

                                    <div>
                                        <label
                                            htmlFor={`ticket-price-${index}`}
                                            className="mb-2 block text-sm font-bold text-gray-900"
                                        >
                                            Ticket Price (KES)
                                        </label>

                                        <TextField
                                            id={`ticket-price-${index}`}
                                            fullWidth
                                            type="number"
                                            sx={sxVariable}
                                            value={ticket.ticketPrice === 0
                                                ? ""
                                                : ticket.ticketPrice}
                                            onChange={(event) => updateTicket(
                                                index,
                                                "ticketPrice",
                                                event.target.value === ""
                                                    ? 0
                                                    : Number(event.target.value)
                                            )}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 1,
                                                    step: 1,
                                                },
                                            }}
                                            placeholder="e.g. 500"
                                            error={hasAttemptedToContinue && Boolean(errors.ticketPrice)}
                                            helperText={hasAttemptedToContinue && errors.ticketPrice ? errors.ticketPrice : " "}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor={`ticket-quantity-${index}`}
                                            className="mb-2 block text-sm font-bold text-gray-900"
                                        >
                                            Ticket Quantity
                                        </label>

                                        <TextField
                                            id={`ticket-quantity-${index}`}
                                            fullWidth
                                            type="number"
                                            sx={sxVariable}
                                            value={ticket.ticketQuantity === 0
                                                ? ""
                                                : ticket.ticketQuantity}
                                            onChange={(event) => updateTicket(
                                                index,
                                                "ticketQuantity",
                                                event.target.value === ""
                                                    ? 0
                                                    : Number(event.target.value)
                                            )}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 1,
                                                    step: 1,
                                                },
                                            }}
                                            placeholder="e.g. 100"
                                            error={hasAttemptedToContinue && Boolean(errors.ticketQuantity)}
                                            helperText={hasAttemptedToContinue && errors.ticketQuantity ? errors.ticketQuantity : " "}
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor={`ticket-type-${index}`}
                                            className="mb-2 block text-sm font-bold text-gray-900"
                                        >
                                            Ticket Type
                                        </label>

                                        <TextField
                                            id={`ticket-type-${index}`}
                                            select
                                            fullWidth
                                            sx={sxVariable}
                                            value={ticket.ticketFor}
                                            onChange={(event) => updateTicket(
                                                index,
                                                "ticketFor",
                                                event.target.value === ""
                                                    ? null
                                                    : Number(event.target.value)
                                            )}
                                            error={hasAttemptedToContinue && Boolean(errors.ticketFor)}
                                            helperText={hasAttemptedToContinue && errors.ticketFor ? errors.ticketFor : " "}
                                        >
                                            {ticketTypeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.ticketFor}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor={`ticket-scope-${index}`}
                                            className="mb-2 block text-sm font-bold text-gray-900"
                                        >
                                            Ticket Scope
                                        </label>

                                        <TextField
                                            id={`ticket-scope-${index}`}
                                            select
                                            fullWidth
                                            required
                                            sx={sxVariable}
                                            value={ticket.scope}
                                            onChange={(event) => {
                                                updateTicket(
                                                    index,
                                                    "scope",
                                                    event.target.value as EventVisibilityType
                                                );
                                            }}
                                            error={hasAttemptedToContinue && Boolean(errors.ticketFor)}
                                            helperText={hasAttemptedToContinue && errors.ticketFor ? errors.ticketFor : " "}
                                        >
                                            {ticketVisibilityOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>

                                    {ticket.scope === "institution" && (
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor={`ticket-institutions-${index}`}
                                                className="mb-2 block text-sm font-bold text-gray-900"
                                            >
                                                Ticket Institutions
                                            </label>

                                            <TextField
                                                id={`ticket-institutions-${index}`}
                                                fullWidth
                                                sx={sxVariable}
                                                value={ticket.institutions
                                                    ?.map((institution) => institution.name)
                                                    .join(", ") ?? ""}
                                                placeholder="Choose institutions"
                                                slotProps={{
                                                    input: {
                                                        readOnly: true,
                                                    },
                                                }}
                                                onClick={() => handleOpenInstitutionDialog(index)}
                                                helperText="Click to select the institutions eligible for this ticket." />
                                        </div>
                                    )}

                                    {isMultiDayEvent && (
                                        <>
                                            <div>
                                                <label
                                                    htmlFor={`ticket-start-${index}`}
                                                    className="mb-2 block text-sm font-bold text-gray-900"
                                                >
                                                    Ticket Validity Start
                                                </label>

                                                <DateTimePicker
                                                    value={ticket.startDate
                                                        ? dayjs(ticket.startDate)
                                                        : null}
                                                    onChange={(value: Dayjs | null) => updateTicket(
                                                        index,
                                                        "startDate",
                                                        value && value.isValid()
                                                            ? value.toISOString()
                                                            : ""
                                                    )}
                                                    slotProps={{
                                                        textField: {
                                                            id: `ticket-start-${index}`,
                                                            fullWidth: true,
                                                            sx: sxVariable,
                                                            error: hasAttemptedToContinue && Boolean(errors.startDate),
                                                            helperText: (hasAttemptedToContinue && errors.startDate) ?? ""
                                                        },
                                                    }} />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor={`ticket-end-${index}`}
                                                    className="mb-2 block text-sm font-bold text-gray-900"
                                                >
                                                    Ticket Validity End
                                                </label>

                                                <DateTimePicker
                                                    value={ticket.endDate
                                                        ? dayjs(ticket.endDate)
                                                        : null}
                                                    onChange={(value: Dayjs | null) => updateTicket(
                                                        index,
                                                        "endDate",
                                                        value && value.isValid()
                                                            ? value.toISOString()
                                                            : ""
                                                    )}
                                                    slotProps={{
                                                        textField: {
                                                            id: `ticket-end-${index}`,
                                                            fullWidth: true,
                                                            sx: sxVariable,
                                                            error: hasAttemptedToContinue && Boolean(errors.endDate),
                                                            helperText: (hasAttemptedToContinue && errors.endDate) ?? ""
                                                        },
                                                    }} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Paper>
                        );
                    })}
                </div>

                <div className="mt-5">
                    <Button
                        variant="outlined"
                        startIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={handleAddTicket}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            borderStyle: "dashed",
                            borderRadius: 2,
                            py: 1.2,
                        }}
                    >
                        Add Another Ticket
                    </Button>

                    <InstitutionDialog {...institutionDialogProps} />
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default PaidTicketCreation;
