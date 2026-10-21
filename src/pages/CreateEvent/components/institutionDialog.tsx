import { useEffect, useState } from "react";

import {
    Alert,
    Button,
    Checkbox,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";

import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Institution } from "../../../models/institution";
import useInstitutionStore from "../../../stores/institutionStore";
import { useShallow } from "zustand/react/shallow";

export interface InstitutionDialogProps {
    institutionDialogOpen: boolean;
    pendingInstitutions: Institution[];

    handleCloseInstitutionDialog: () => void;
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
    const { isLoading, error, institutions, searchInstitutionByName } = useInstitutionStore(
        useShallow((state) => ({
            isLoading: state.isLoading,
            error: state.error,
            institutions: state.institutions,
            searchInstitutionByName: state.searchInstitutionByName,
        }))
    );

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchQuery.trim();

        if (!query) {
            return;
        }

        const timeoutId = window.setTimeout(async () => {
            await searchInstitutionByName(query);

        }, 400);

        return () => {
            window.clearTimeout(timeoutId);
        };

    }, [searchQuery, searchInstitutionByName]);

    const handleRemoveInstitution = (institution: Institution) => {
        handleInstitutionToggle(institution);
    };

    const handleDialogClose = () => {
        setSearchQuery("");
        handleCloseInstitutionDialog();
    };

    return (
        <Dialog
            open={institutionDialogOpen}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Select Institutions
            </DialogTitle>

            <DialogContent dividers>
                <p className="mb-4 text-sm text-gray-600">
                    Search for institutions that can access this event.
                </p>

                {/* Search bar */}
                <TextField
                    fullWidth
                    placeholder="Search institutions..."
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setSearchQuery("")}
                                        edge="end"
                                        aria-label="Clear search"
                                        size="small"
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {/* Search results */}
                <div className="mt-5 min-h-36">
                    {isLoading ? (
                        <div className="flex min-h-36 flex-col items-center justify-center gap-3">
                            <CircularProgress
                                size={32}
                                sx={{ color: "#7C3AED" }}
                            />

                            <p className="text-sm text-gray-500">
                                Searching institutions...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="py-4">
                            <Alert
                                severity="error"
                            >
                                {error}
                            </Alert>
                        </div>
                    ) : (institutions.length === 0 && searchQuery.trim()) ? (
                        <div className="flex min-h-36 flex-col items-center justify-center text-center">
                            <p className="font-semibold text-gray-700">
                                No institutions found
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Try searching with a different name.
                            </p>
                        </div>
                    ) : institutions.length > 0 ? (
                        <div>
                            <p className="mb-2 text-sm font-semibold text-gray-700">
                                Search Results ({institutions.length})
                            </p>

                            <div className="flex max-h-56 flex-col overflow-y-auto">
                                {institutions.map((institution) => {
                                    const isSelected =
                                        pendingInstitutions.some(
                                            (selected) =>
                                                selected.institutionId ===
                                                institution.institutionId
                                        );

                                    return (
                                        <FormControlLabel
                                            key={institution.institutionId}
                                            control={
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        handleInstitutionToggle(
                                                            institution
                                                        )
                                                    }
                                                    sx={{
                                                        color: "#A476FF",
                                                        "&.Mui-checked": {
                                                            color: "#7C3AED",
                                                        },
                                                    }}
                                                />
                                            }
                                            label={institution.name}
                                            sx={{
                                                mx: 0,
                                                py: 0.5,
                                                borderBottom:
                                                    "1px solid #F3F4F6",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex min-h-36 flex-col items-center justify-center text-center">
                            <FontAwesomeIcon icon={faSearch} />

                            <p className="font-medium text-gray-700">
                                Start by searching for an institution
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Enter an institution name above.
                            </p>
                        </div>
                    )}
                </div>

                {/* Selected institutions */}
                <div className="mt-5 border-t border-gray-200 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                            Selected Institutions
                        </h3>

                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                            {pendingInstitutions.length} selected
                        </span>
                    </div>

                    {pendingInstitutions.length === 0 ? (
                        <p className="py-3 text-sm text-gray-500">
                            No institutions selected yet.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {pendingInstitutions.map((institution) => (
                                <div
                                    key={institution.institutionId}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2"
                                >
                                    <p className="min-w-0 flex-1 wrap-break-word text-sm font-medium text-gray-800">
                                        {institution.name}
                                    </p>

                                    <IconButton
                                        size="small"
                                        aria-label={`Remove ${institution.name}`}
                                        onClick={() =>
                                            handleRemoveInstitution(
                                                institution
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>

            <DialogActions className="p-4">
                <Button
                    onClick={handleDialogClose}
                    color="inherit"
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleConfirmInstitutions}
                    disabled={pendingInstitutions.length === 0}
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
    );
}

export default InstitutionDialog;