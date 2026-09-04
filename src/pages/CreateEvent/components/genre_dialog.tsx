import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function GenreDialog({
    dialogOpen,
    closeDialogue,
    eventGenres,
    chooseGenres,
    clearGenres,
    applyGenres,
    tempGenres,
}: {
    dialogOpen: boolean,
    closeDialogue: () => void,
    eventGenres: string[],
    chooseGenres: (genre: string) => void,
    clearGenres: () => void,
    applyGenres: () => void,
    tempGenres: string[],
}) {
    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={closeDialogue}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    sx={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        fontWeight: "bold",
                    }}
                    className="flex justify-between items-center"
                >
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faTag} />
                        <h1>Select Event Genres</h1>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-fit rounded-full border border-purple-500 bg-purple-500 px-4 py-1 text-xs font-semibold text-white">
                            {tempGenres.length}/{eventGenres.length} Selected
                        </div>
                        <FontAwesomeIcon icon={faXmark} className="cursor-pointer" onClick={closeDialogue} />
                    </div>
                </DialogTitle>

                <DialogContent>
                    <p className="my-4 text-sm text-gray-600">
                        Select the genres that best represent your event.
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {eventGenres.map((genre) => (
                            <label
                                key={genre}
                                className="flex cursor-pointer items-center rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                            >
                                <Checkbox
                                    checked={tempGenres.includes(genre)}
                                    onChange={() => chooseGenres(genre)}
                                />

                                <span className="text-sm">
                                    {genre}
                                </span>
                            </label>
                        ))}
                    </div>
                </DialogContent>

                <DialogActions sx={
                    {
                        display: "flex",
                        justifyContent: "space-between",
                    }
                }
                    className="border-t border-gray-200 p-4">
                    <button
                        type="button"
                        onClick={clearGenres}
                        className="rounded-md border border-primary px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                    >
                        Clear
                    </button>

                    <button
                        type="button"
                        onClick={applyGenres}
                        disabled={tempGenres.length === 0}
                        className="rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Apply Genres {tempGenres.length > 0 && `(${tempGenres.length} selected)`}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default GenreDialog;