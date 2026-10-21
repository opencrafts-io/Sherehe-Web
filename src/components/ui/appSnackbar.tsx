import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { AlertColor } from "@mui/material/Alert";

interface AppSnackbarProps {
    open: boolean;
    message: string;
    severity?: AlertColor;
    onClose: () => void;
}

function AppSnackbar({
    open,
    message,
    severity = "error",
    onClose,
}: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={(_, reason) => {
                if (reason === "clickaway") return;
                onClose();
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                elevation={6}
                sx={{
                    width: "100%",
                    minWidth: { xs: "auto", sm: 320 },
                    maxWidth: 450,
                    borderRadius: 2,
                    alignItems: "center",
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default AppSnackbar;