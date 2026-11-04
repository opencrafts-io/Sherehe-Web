import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import type { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers/models";
import type { Dayjs } from "dayjs";

export interface DateTimePickerComponentProps {
    textFieldId: string;
    textFieldName: string;
    error: any;
    helperText: string;
    value?: PickerValue | undefined;
    onValueChange?: ((value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => void) | undefined;
    minDateTime?: Dayjs | undefined;
    maxDateTime?: Dayjs | undefined;
}

function DateTimePickerComponent({ textFieldId, textFieldName, error, helperText, value, onValueChange, minDateTime, maxDateTime }: DateTimePickerComponentProps) {
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

    return (
        <>
            <DateTimePicker
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                slotProps={{
                    textField: {
                        id: textFieldId,
                        name: textFieldName,
                        fullWidth: true,
                        sx: {
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
                        },
                        error: error,
                        helperText: helperText,
                    },
                    openPickerButton: {
                        sx: {
                            color: 'var(--color-primary)',
                            '&:hover': {
                                backgroundColor: 'var(--color-primary-95)',
                            },
                        },
                    },
                    day: {
                        sx: {
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
                        },
                    },
                    // Desktop picker container
                    desktopPaper: {
                        sx: {
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
                        },
                    },

                    // Mobile picker container
                    dialog: {
                        sx: pickerContainerStyles,
                    },
                    calendarHeader: {
                        sx: {
                            "& .MuiPickersCalendarHeader-label": {
                                color: "var(--color-primary)",
                                fontWeight: 700,
                            },

                            "& .MuiPickersArrowSwitcher-button": {
                                color: "var(--color-primary)",
                            },
                        },
                    },
                    monthButton: {
                        sx: {
                            "&.Mui-selected": {
                                backgroundColor: "var(--color-primary)",
                                color: "#FFFFFF",
                            },

                        },
                    },
                    yearButton: {
                        sx: {
                            "&.Mui-selected": {
                                backgroundColor: "var(--color-primary)",
                                color: "#FFFFFF",

                                "&:hover, &:focus": {
                                    backgroundColor: "var(--color-primary)",
                                },
                            },
                        },
                    },
                    actionBar: {
                        sx: {
                            "& .MuiButton-root": {
                                color: "var(--color-primary)",
                            },
                        },
                    },
                }}
                value={value}
                onChange={onValueChange}
            />
        </>
    );
}

export default DateTimePickerComponent;