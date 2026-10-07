import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function ErrorPaymentDialogue({ showError, closeDialog, error, title }: { showError: boolean, closeDialog: () => void, error: string | null, title: string }) {
    return (
        <>
            <Dialog
                open={showError}
                onClose={closeDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {title}
                </DialogTitle>

                <DialogContent>
                    <p className="text-sm text-gray-600">
                        {error ?? "Something unexpected happened, please try again"}
                    </p>
                </DialogContent>

                <DialogActions>
                    <button
                        type="button"
                        onClick={closeDialog}
                        className="mr-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                    >
                        Close
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ErrorPaymentDialogue;