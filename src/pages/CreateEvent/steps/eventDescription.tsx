import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShapes,
    faPenToSquare,
    faXmark,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import GenreDialog from "../components/genreDialog";
import {
    Alert,
    TextField,
    type SxProps,
    type Theme,
} from "@mui/material";

export interface EventDescriptionProps {
    selectedGenres: string[];
    chooseGenres: (genre: string) => void;
    eventGenres: string[];
    removeGenre: (genre: string) => void;
    dialogOpen: boolean;
    closeDialogue: () => void;
    clearGenres: () => void;
    applyGenres: () => void;
    openDialogue: () => void;
    tempGenres: string[];
    sxVariable: SxProps<Theme>;
    hasAttemptedToContinue: boolean;
    eventDescription: string;
    setEventDescription: (eventDescription: string) => void;
}

function EventDescription({
    selectedGenres,
    chooseGenres,
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
}: EventDescriptionProps) {
    const isEventDescriptionInvalid =
        hasAttemptedToContinue && !eventDescription.trim();

    const areGenresInvalid =
        hasAttemptedToContinue && selectedGenres.length === 0;

    return (
        <div className="flex w-full min-w-0 flex-col gap-5 sm:gap-6">
            <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                    Event Description &amp; Genres
                </h2>
                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    Describe your event and choose the genres that best
                    represent it.
                </p>
            </div>

            {/* Event Genres */}
            <section className="flex min-w-0 flex-col gap-4 rounded-lg border border-gray-200 p-3 sm:p-5 lg:p-6">
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <FontAwesomeIcon
                                icon={faShapes}
                                className="text-primary"
                            />

                            <h3 className="text-base font-bold sm:text-lg">
                                Event Genres
                            </h3>

                            <span className="rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                {selectedGenres.length} Selected
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                            Select genres that best represent your event.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openDialogue}
                        disabled={selectedGenres.length === 0}
                        className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-purple-100 px-3 py-2.5 text-sm font-medium text-purple-700 transition hover:bg-purple-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>
                            Edit Selection ({selectedGenres.length}/
                            {eventGenres.length})
                        </span>
                    </button>
                </div>

                {/* Selected genre chips */}
                <div className="flex min-w-0 flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                    {selectedGenres.map((genre) => (
                        <div
                            key={genre}
                            className="inline-flex max-w-full items-center gap-2 rounded-full border border-purple-200 bg-purple-100 py-2 pl-3 pr-2 text-xs font-semibold text-purple-700 sm:text-sm"
                        >
                            <span className="break-words">{genre}</span>

                            <button
                                type="button"
                                onClick={() => removeGenre(genre)}
                                aria-label={`Remove ${genre}`}
                                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition hover:bg-purple-200"
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={openDialogue}
                        disabled={selectedGenres.length >= eventGenres.length}
                        className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-dashed border-gray-400 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
                    >
                        <FontAwesomeIcon icon={faPlus} />

                        <span>
                            {selectedGenres.length > 0
                                ? "Add More Genres"
                                : "Add Genre"}
                        </span>
                    </button>
                </div>

                {areGenresInvalid && (
                    <Alert severity="error">
                        Please select at least one genre before continuing.
                    </Alert>
                )}
            </section>

            {/* Event Description */}
            <section className="flex min-w-0 flex-col gap-2">
                <label
                    htmlFor="eventDescription"
                    className="font-bold text-gray-900 sm:text-base"
                >
                    Event Description
                    <span className="ml-1 text-red-600">*</span>
                </label>

                <p className="text-sm text-gray-600">
                    Tell attendees what to expect, what makes the event
                    special, and any important details they should know.
                </p>

                <TextField
                    id="eventDescription"
                    name="eventDescription"
                    required
                    fullWidth
                    multiline
                    minRows={5}
                    maxRows={12}
                    placeholder="Tell attendees about your event..."
                    sx={sxVariable}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    error={isEventDescriptionInvalid}
                    helperText={
                        isEventDescriptionInvalid
                            ? "Event description is required."
                            : "Include useful details to help attendees decide whether to attend."
                    }
                />
            </section>

            {dialogOpen && (
                <GenreDialog
                    dialogOpen={dialogOpen}
                    closeDialogue={closeDialogue}
                    eventGenres={eventGenres}
                    chooseGenres={chooseGenres}
                    clearGenres={clearGenres}
                    applyGenres={applyGenres}
                    tempGenres={tempGenres}
                />
            )}
        </div>
    );
}

export default EventDescription;