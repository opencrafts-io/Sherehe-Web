import { create } from "zustand";
import type { Institution } from "../models/institution";
import institutionService from "../services/institutionService";
import { getErrorMessage } from "../utils/getErrorMessage";

interface InstitutionState {
    isLoading: boolean;
    error: string | null;
    institutions: Institution[];

    searchInstitutionByName: (name: string, limit?: number) => void;
}

const useInstitutionStore = create<InstitutionState>()((set) => ({
    isLoading: false,
    error: null,
    institutions: [],
    searchInstitutionByName: async (name, limit = 100) => {
        try {
            set({
                isLoading: true,
                error: null,
                institutions: [],
            });

            const institutions = await institutionService.searchInstitutionByName(name, limit);

            set({
                isLoading: false,
                error: null,
                institutions,
            });

        } catch (error) {
            set({
                isLoading: false,
                error: getErrorMessage(error),
                institutions: [],
            });
        }
    },
}));

export default useInstitutionStore;