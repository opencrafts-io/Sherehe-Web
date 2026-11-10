import {
    Box,
    Dialog,
    DialogContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import LoginButtons from "../../Login/components/loginButtons";

interface LoginRequiredDialogProps {
    open: boolean;
    onClose: () => void;
    redirectTo?: string;
}

function LoginRequiredDialog({
    open,
    onClose,
}: LoginRequiredDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "20px",
                        p: { xs: 1, sm: 1.5 },
                        boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.12)",
                    },
                }

            }}
        >
            <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack
                    spacing={2.5}
                    sx={{ alignItems: "center" }}
                >

                    {/* Close button */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            onClick={onClose}
                            size="small"
                            aria-label="Close dialog"
                            sx={{
                                color: "text.secondary",
                                "&:hover": {
                                    backgroundColor: "rgba(124, 58, 237, 0.08)",
                                },
                            }}
                        >
                            <Box component="span" sx={{ fontSize: 22 }}>
                                ×
                            </Box>
                        </IconButton>
                    </Box>

                    {/* Decorative icon */}
                    <Box
                        sx={{
                            width: 76,
                            height: 76,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--color-primary-95)",
                            color: "var(--color-primary)",
                            fontSize: 36,
                        }}
                    >
                        ✦
                    </Box>

                    {/* Heading and description */}
                    <Stack spacing={1} sx={{ alignItems: "center" }}>
                        <Typography
                            variant="h5"

                            sx={{
                                color: "#242424", fontWeight: 700,
                                textAlign: "center",
                            }}
                        >
                            You're one step away!
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                lineHeight: 1.7,
                                maxWidth: 310,
                                color: "text.secondary",
                                textAlign: "center",
                            }}
                        >
                            Sign in to your Sherehe account to continue.
                            Join the community, discover amazing events,
                            and never miss an experience worth remembering!
                        </Typography>
                    </Stack>

                    {/* Actions */}
                    <Stack spacing={1.5} sx={{ width: "100%", mt: 1 }}>
                        <LoginButtons />
                    </Stack>

                    <Typography
                        variant="caption"
                        sx={
                            {
                                color: "text.disabled",
                                textAlign: "center",
                            }
                        }
                    >
                        Your next great experience awaits!
                    </Typography>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default LoginRequiredDialog;