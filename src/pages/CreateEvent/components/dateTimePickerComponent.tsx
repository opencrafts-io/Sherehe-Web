import type { SxProps, Theme } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import type { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers/models";

export interface DateTimePickerComponentProps {
    textFieldId: string;
    textFieldName: string;
    error: any;
    helperText: string;
    value?: PickerValue | undefined;
    onValueChange?: ((value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => void) | undefined
}

function DateTimePickerComponent({ textFieldId, textFieldName, error, helperText, value, onValueChange }: DateTimePickerComponentProps) {
    const selectedDayStyles = {
        "&.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",

            "&:hover, &:focus": {
                backgroundColor: "var(--color-primary-60)",
            },
        },

        "&.MuiPickersDay-today:not(.Mui-selected)": {
            borderColor: "var(--color-primary)",
        },
    };

    const clockStyles = {
        "& .MuiClock-pin, & .MuiClockPointer-root": {
            backgroundColor: "var(--color-primary)",
        },

        "& .MuiClockPointer-thumb": {
            backgroundColor: "var(--color-primary)",
            borderColor: "var(--color-primary)",
        },

        "& .MuiClockNumber-root.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
        },
    };

    const pickerContainerStyles = {
        // Clock selection
        ...clockStyles,

        "& .MuiMultiSectionDigitalClockSection-item.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
        },

        // Cancel and OK buttons
        "& .MuiDialogActions-root .MuiButton-root": {
            color: "var(--color-primary)",
            fontWeight: 600,

            "&:hover": {
                backgroundColor: "var(--color-primary-95)",
            },
        },
    };

    const calendarHeader = {
        "& .MuiPickersCalendarHeader-label": {
            color: "var(--color-primary)",
            fontWeight: 700,
        },

        "& .MuiPickersArrowSwitcher-button": {
            color: "var(--color-primary)",
        },
    };

    const monthButton = {
        "&.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
        },

    };

    const yearButton = {
        "&.Mui-selected": {
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",

            "&:hover, &:focus": {
                backgroundColor: "var(--color-primary)",
            },
        },
    };

    const actionBar = {
        "& .MuiButton-root": {
            color: "var(--color-primary)",
        },
    };

    const sxDateTextField: SxProps<Theme> = {
        '& .MuiPickersOutlinedInput-root': {
            '&:hover .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary-70)',
            },
            '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
                borderColor: 'var(--color-primary)',
            },
        },

        '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--color-primary)',
        },
    };

    const openPickerButton = {
        color: 'var(--color-primary)',
        '&:hover': {
            backgroundColor: 'var(--color-primary-95)',
        },
    };

    return (
        <>
            <DateTimePicker
                slotProps={{
                    textField: {
                        id: textFieldId,
                        name: textFieldName,
                        fullWidth: true,
                        sx: sxDateTextField,
                        error: error,
                        helperText: helperText,
                    },
                    openPickerButton: {
                        sx: openPickerButton,
                    },
                    day: {
                        sx: selectedDayStyles,
                    },
                    // Desktop picker container
                    desktopPaper: {
                        sx: pickerContainerStyles,
                    },

                    // Mobile picker container
                    dialog: {
                        sx: pickerContainerStyles,
                    },
                    calendarHeader: {
                        sx: calendarHeader,
                    },
                    monthButton: {
                        sx: monthButton,
                    },
                    yearButton: {
                        sx: yearButton,
                    },
                    actionBar: {
                        sx: actionBar,
                    },
                }}
                value={value}
                onChange={onValueChange}
            />
        </>
    );
}

export default DateTimePickerComponent;