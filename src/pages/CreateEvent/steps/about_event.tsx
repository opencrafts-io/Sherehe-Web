import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, TextField, type SxProps, type Theme } from '@mui/material';
import type { EventVisibility } from '../create_event';

function AboutEvent({ sxVariable, eventVisibilityOptions }: { sxVariable: SxProps<Theme>, eventVisibilityOptions: EventVisibility[] }) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h1 className='text-4xl my-2 font-bold'>Event Details</h1>
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
            </LocalizationProvider>
        </>
    );
}

export default AboutEvent;