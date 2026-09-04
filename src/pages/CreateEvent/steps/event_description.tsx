import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShapes, faPenToSquare, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import GenreDialog from "../components/genre_dialog";
import { TextField, type SxProps, type Theme } from "@mui/material";


function EventDescription({
    selectedGenre,
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
}:
    {
        selectedGenre: string[],
        chooseGenres: (genre: string) => void,
        eventGenres: string[],
        removeGenre: (genre: string) => void,
        dialogOpen: boolean,
        closeDialogue: () => void,
        clearGenres: () => void,
        applyGenres: () => void,
        openDialogue: () => void,
        tempGenres: string[],
        sxVariable: SxProps<Theme>
    }) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <h2 className='text-4xl my-2 font-bold'>Event Description & Genres</h2>
                <div className="flex flex-col border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-4 items-center">
                                <FontAwesomeIcon icon={faShapes} className="text-primary" />
                                <h3 className="text-lg font-bold">Event Genres</h3>
                                <div className="flex flex-col border border-gray-200 rounded-full  bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                                    {selectedGenre.length} Selected
                                </div>
                            </div>
                            <p className="text-base text-gray-600">Select genres that best represent your event</p>
                        </div>
                        <button
                            type="button"
                            onClick={openDialogue}
                            disabled={selectedGenre.length === 0}
                            className="flex h-full items-center gap-1 border rounded-lg p-2 border-gray-800  bg-purple-100 text-purple-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Edit Selection {selectedGenre.length}/{eventGenres.length}</p>
                        </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {selectedGenre.map((genre) => (
                            <div
                                key={genre}
                                className="flex items-center gap-2 rounded-full border border-gray-200 bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700"
                            >
                                <p>{genre}</p>

                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="cursor-pointer"
                                    onClick={() => removeGenre(genre)}
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={openDialogue}
                            disabled={selectedGenre.length >= eventGenres.length}
                            className="flex items-center gap-2 rounded-full border border-dashed border-gray-400 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faPlus} />

                            {selectedGenre.length > 0
                                ? "Add More Genres"
                                : "Add Genre"}
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <label
                        htmlFor="eventDescription"
                        className="my-2 block font-bold"
                    >
                        Event Description
                    </label>

                    <TextField
                        id="eventDescription"
                        name="eventDescription"
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Tell attendees about your event..."
                        sx={sxVariable}
                    />
                </div>

                {dialogOpen === true && (
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

        </>
    );
}

export default EventDescription;