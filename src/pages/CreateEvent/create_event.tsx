import { useState } from "react";
import BookingStepper, { type Steps } from "../../components/ui/booking_stepper";
import { type SxProps, type Theme } from "@mui/material";
import AboutEvent from "./steps/about_event";
import EventDescription from "./steps/event_description";

export interface EventVisibility {
    id: string;
    value: string;
    label: string;
}

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

    return (
        <>
            <div className="flex flex-col my-6 mx-10 gap-3 border border-gray-200 rounded-lg">
                <div className="flex flex-col p-6 gap-3 border border-gray-200 bg-gray-100 ">
                    <h1 className="font-bold text-3xl">Create Event</h1>
                    <BookingStepper currentStep={currentPage} steps={steps} />
                </div>
                <div className="flex flex-col p-6">
                    {currentPage === 1 && (
                        <AboutEvent
                            sxVariable={sxVariable}
                            eventVisibilityOptions={eventVisibilityOptions}
                        />
                    )}
                    {currentPage === 2 && (
                        <EventDescription
                            selectedGenre={selectedGenres}
                            chooseGenres={chooseGenres}
                            eventGenres={eventGenres}
                            removeGenre={removeGenre}
                            dialogOpen={dialogOpen}
                            closeDialogue={closeDialogue}
                            clearGenres={clearGenres}
                            applyGenres={applyGenres}
                            openDialogue={openDialogue}
                            tempGenres={tempGenres}
                        />
                    )}
                </div>
                <div className="flex justify-between p-6 border border-gray-200 bg-gray-100">
                    <button
                        type="button"
                        onClick={previousPage}
                        className={currentPage === 1 ? "hidden" : "rounded-md border border-primary px-4 py-3 font-medium text-primary transition hover:bg-primary-95"}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={nextPage}
                        className="ml-auto rounded-md bg-primary px-4 py-3 font-medium text-white transition hover:bg-purple-700"
                    >
                        Continue
                    </button>
                </div>

            </div>

        </>
    );
}

export default CreateEvent;