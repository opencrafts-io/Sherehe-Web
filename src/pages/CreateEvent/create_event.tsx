import { useState } from "react";
import BookingStepper, { type Steps } from "../../components/ui/booking_stepper";
import { MenuItem, TextField, type SxProps, type Theme } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


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
    const eventVisibilityOptions = [
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
    const nextPage = () => {
        if (currentPage < steps.length) {
            setCurrentPage(currentPage + 1);
        }
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
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex flex-col my-6 mx-10 gap-3 border border-gray-200 rounded-lg">
                    <div className="flex flex-col p-6 gap-3 border border-gray-200 bg-gray-100 ">
                        <h1 className="font-bold text-3xl">Create Event</h1>
                        <BookingStepper currentStep={currentPage} steps={steps} />
                    </div>
                    <div className="flex flex-col p-6">
                        <form action="submit">
                            <label
                                htmlFor="eventName"
                                className="font-bold block my-2"
                            >
                                Event Name
                            </label>
                            <TextField
                                id="eventName"
                                type="text"
                                fullWidth
                                placeholder="eg Summer Music Festival"
                                required
                                sx={sxVariable}
                            />
                            <label
                                htmlFor="startDateTime"
                                className="font-bold block my-2"
                            >
                                Start Date & Time
                            </label>
                            <DateTimePicker
                                slotProps={{
                                    textField: {
                                        id: "endDateTime",
                                        fullWidth: true,
                                    },
                                }}
                            />
                            <label
                                htmlFor="endDateTime"
                                className="font-bold block my-2"
                            >
                                End Date & Time
                            </label>
                            <DateTimePicker
                                slotProps={{
                                    textField: {
                                        id: "endDateTime",
                                        fullWidth: true,
                                    },
                                }}
                            />
                            <label
                                htmlFor="eventLocation"
                                className="font-bold block my-2"
                            >
                                Location
                            </label>
                            <TextField
                                id="eventLocation"
                                type="text"
                                fullWidth
                                placeholder="eg Summer Music Festival"
                                required
                                sx={sxVariable}
                            />
                            <label
                                htmlFor="eventVisibility"
                                className="font-bold block my-2"
                            >
                                Event Visibility
                            </label>
                            <TextField
                                id="eventVisibility"
                                select
                                fullWidth
                                placeholder="Select Event Scope"
                                required
                                sx={sxVariable}
                                defaultValue="public"
                            >
                                {eventVisibilityOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>
                    </div>
                    <div className="flex justify-between p-6 border border-gray-200 bg-gray-100">
                        <button
                            type="button"
                            className={currentPage === 1 ? "hidden" : "rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="ml-auto rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700"
                        >
                            Continue
                        </button>
                    </div>

                </div>
            </LocalizationProvider>

        </>
    );
}

export default CreateEvent;