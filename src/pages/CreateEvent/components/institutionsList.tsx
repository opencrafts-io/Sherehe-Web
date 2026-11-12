import { Checkbox, FormControlLabel } from "@mui/material";
import type { Institution } from "../../../models/institution";

export interface InstitutionsListProps {
    institutions: Institution[];
    pendingInstitutions: Institution[];
    handleInstitutionToggle: (institution: Institution) => void;
}


function InstitutionsList({ institutions, pendingInstitutions, handleInstitutionToggle }: InstitutionsListProps) {
    return (
        <>
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
        </>
    );
}

export default InstitutionsList;