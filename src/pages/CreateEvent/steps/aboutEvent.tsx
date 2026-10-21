import { useState } from "react";

import {
    MenuItem,
    TextField,
    type SxProps,
    type Theme,
} from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";

import type { EventVisibility, EventVisibilityType } from "../createEvent";
import type { InstitutionDialogProps } from "../components/institutionDialog";
import type { Institution } from "../../../models/institution";
import InstitutionDialog from "../components/institutionDialog";

export interface AboutEventProps {
    sxVariable: SxProps<Theme>;
    eventVisibilityOptions: EventVisibility[];
    eventName: string;
    eventStartDateTime: string;
    eventEndDateTime: string;
    eventLocation: string;
    eventVisibility: EventVisibilityType;
    selectedInstitutions: Institution[];
    hasAttemptedToContinue: boolean;

    setEventName: (value: string) => void;
    setEventStartDateTime: (value: string) => void;
    setEventEndDateTime: (value: string) => void;
    setEventLocation: (value: string) => void;
    setEventVisibility: (value: EventVisibilityType) => void;
    setSelectedInstitutions: (value: Institution[]) => void;
}

function AboutEvent({
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
}: AboutEventProps) {
    const [institutionDialogOpen, setInstitutionDialogOpen] = useState(false);

    // Temporary selection while the dialog is open.
    const [pendingInstitutions, setPendingInstitutions] = useState<Institution[]>([]);

    const handleOpenInstitutionDialog = () => {
        setPendingInstitutions(selectedInstitutions);
        setInstitutionDialogOpen(true);
    };

    const handleInstitutionToggle = (institution: Institution) => {
        setPendingInstitutions((previous) =>
            previous.some(
                (inst) => inst.institutionId === institution.institutionId
            )
                ? previous.filter(
                    (inst) => inst.institutionId !== institution.institutionId
                )
                : [...previous, institution]
        );
    };

    const handleConfirmInstitutions = () => {
        setSelectedInstitutions(pendingInstitutions);
        setInstitutionDialogOpen(false);
    };

    const handleCloseInstitutionDialog = () => {
        setInstitutionDialogOpen(false);
    };

    const selectedInstitutionNames = (selectedInstitutions ?? [])
        .map((institution) => institution.name)
        .join(", ");

    const insititutionDialogProps: InstitutionDialogProps = {
        institutionDialogOpen,
        pendingInstitutions,
        handleCloseInstitutionDialog,
        handleConfirmInstitutions,
        handleInstitutionToggle,
    };

    const isEventNameInvalid =
        hasAttemptedToContinue && !eventName.trim();

    const isLocationInvalid =
        hasAttemptedToContinue && !eventLocation.trim();

    const startDate = eventStartDateTime
        ? dayjs(eventStartDateTime)
        : null;

    const endDate = eventEndDateTime
        ? dayjs(eventEndDateTime)
        : null;

    const isStartDateInvalid =
        hasAttemptedToContinue &&
        (!startDate || !startDate.isValid());

    const isEndDateInvalid =
        hasAttemptedToContinue &&
        (
            !endDate ||
            !endDate.isValid() ||
            !startDate ||
            !startDate.isValid() ||
            !endDate.isAfter(startDate)
        );

    const areInstitutionsInvalid =
        hasAttemptedToContinue &&
        eventVisibility === "institution" &&
        selectedInstitutions.length === 0;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Event Details
            </h2>

            <form>
                {/* Event Name */}
                <label
                    htmlFor="eventName"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    Event Name
                </label>

                <TextField
                    id="eventName"
                    name="eventName"
                    type="text"
                    fullWidth
                    placeholder="eg Summer Music Festival"
                    required
                    sx={sxVariable}
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    error={isEventNameInvalid}
                    helperText={
                        isEventNameInvalid ? "Event name is required." : ""
                    }
                />

                {/* Start Date & Time */}
                <label
                    htmlFor="startDateTime"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    Start Date & Time
                </label>

                <DateTimePicker
                    slotProps={{
                        textField: {
                            id: "startDateTime",
                            name: "startDateTime",
                            fullWidth: true,
                            sx: sxVariable,
                            error: isStartDateInvalid,
                            helperText: isStartDateInvalid
                                ? "A valid start date is required."
                                : "",
                        },
                    }}
                    value={eventStartDateTime ? dayjs(eventStartDateTime) : null}
                    onChange={(value: Dayjs | null) => {
                        setEventStartDateTime(
                            value && value.isValid() ? value.toISOString() : ""
                        );
                    }}
                />

                {/* End Date & Time */}
                <label
                    htmlFor="endDateTime"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    End Date & Time
                </label>

                <DateTimePicker
                    slotProps={{
                        textField: {
                            id: "endDateTime",
                            name: "endDateTime",
                            fullWidth: true,
                            sx: sxVariable,
                            error: isEndDateInvalid,
                            helperText: isEndDateInvalid
                                ? "Select an end date and time after the start date."
                                : "",
                        },
                    }}
                    value={eventEndDateTime ? dayjs(eventEndDateTime) : null}
                    onChange={(value: Dayjs | null) => {
                        setEventEndDateTime(
                            value && value.isValid() ? value.toISOString() : ""
                        );
                    }}
                />

                {/* Location */}
                <label
                    htmlFor="eventLocation"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    Location
                </label>

                <TextField
                    id="eventLocation"
                    name="eventLocation"
                    type="text"
                    fullWidth
                    placeholder="eg KICC, Nairobi"
                    required
                    sx={sxVariable}
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    error={isLocationInvalid}
                    helperText={
                        isLocationInvalid ? "Event location is required." : ""
                    }
                />

                {/* Event Visibility */}
                <label
                    htmlFor="eventVisibility"
                    className="my-2 block text-base font-bold text-gray-900"
                >
                    Event Visibility
                </label>

                <TextField
                    id="eventVisibility"
                    name="eventVisibility"
                    select
                    fullWidth
                    required
                    sx={sxVariable}
                    value={eventVisibility}
                    onChange={(event) => {
                        const visibility = event.target.value as EventVisibilityType;
                        setEventVisibility(visibility);

                        if (visibility !== "institution") {
                            setSelectedInstitutions([]);
                            setPendingInstitutions([]);
                        }
                    }}
                >
                    {eventVisibilityOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Institutions: visible only for institution events */}
                {eventVisibility === "institution" && (
                    <>
                        <label
                            htmlFor="selectedInstitutions"
                            className="my-2 block text-base font-bold text-gray-900"
                        >
                            Select Institutions
                        </label>

                        <TextField
                            id="selectedInstitutions"
                            fullWidth
                            value={selectedInstitutionNames}
                            placeholder="Choose institutions"
                            required
                            sx={{
                                ...(
                                    Array.isArray(sxVariable)
                                        ? {}
                                        : sxVariable
                                ),
                                "& .MuiInputBase-input": {
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                },
                            }}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            onClick={handleOpenInstitutionDialog}
                            error={areInstitutionsInvalid}
                            helperText={
                                areInstitutionsInvalid
                                    ? "Select at least one institution."
                                    : "Click to change your institution selection."
                            }
                        />

                        {/* Institution Selection Dialog */}
                        <InstitutionDialog {...insititutionDialogProps} />
                    </>
                )}
            </form>
        </LocalizationProvider>
    );
}

export default AboutEvent;