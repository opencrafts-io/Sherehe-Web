import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from "@mui/material";
import type { Institution } from "../../../models/institution";

export interface InstitutionDialogProps {
    institutionDialogOpen: boolean;
    pendingInstitutions: Institution[]

    handleCloseInstitutionDialog: () => void
    handleConfirmInstitutions: () => void;
    handleInstitutionToggle: (institution: Institution) => void;
}

function InstitutionDialog({
    institutionDialogOpen,
    pendingInstitutions,
    handleCloseInstitutionDialog,
    handleConfirmInstitutions,
    handleInstitutionToggle,
}: InstitutionDialogProps) {
    const institutions: Institution[] = [
        { institutionId: 323, name: "Daystar University" },
        { institutionId: 6237, name: "Kenyatta University" },
        { institutionId: 362, name: "University of Nairobi" },
        { institutionId: 37238, name: "Strathmore University" },
        { institutionId: 3662, name: "Jomo Kenyatta University of Agriculture and Technology" },
    ];

    return (
        <>
            <Dialog
                open={institutionDialogOpen}
                onClose={handleCloseInstitutionDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    Select Institutions
                </DialogTitle>

                <DialogContent dividers>
                    <p className="mb-4 text-sm text-gray-600">
                        Select the institutions that can access
                        this event.
                    </p>

                    <div className="flex flex-col">
                        {institutions.map((institution) => (
                            <FormControlLabel
                                key={institution.institutionId}
                                control={
                                    <Checkbox
                                        checked={pendingInstitutions.some(
                                            (inst) => inst.institutionId === institution.institutionId
                                        )}
                                        onChange={() => handleInstitutionToggle(institution)}
                                    />
                                }
                                label={institution.name}
                            />
                        ))}
                    </div>
                </DialogContent>

                <DialogActions className="p-4">
                    <Button
                        onClick={handleCloseInstitutionDialog}
                        color="inherit"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleConfirmInstitutions}
                        variant="contained"
                        sx={{
                            backgroundColor: "#7C3AED",
                            "&:hover": {
                                backgroundColor: "#6D28D9",
                            },
                        }}
                    >
                        Confirm ({pendingInstitutions.length})
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default InstitutionDialog;