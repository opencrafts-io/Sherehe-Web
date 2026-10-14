import { mapInstitutionDtoToInstitution, type Institution, type InstitutionDto } from "../models/institution";
import { verisafeLoggedInApi } from "./api";

class InstitutionService {
    async searchInstitutionByName(name: string, limit?: number): Promise<Institution[]> {
        const response = await verisafeLoggedInApi.get<InstitutionDto[]>("/institutions/search", {
            params: { q: name, limit: limit }
        });

        return response.data.map((instDto) => mapInstitutionDtoToInstitution(instDto));
    }
}

export default new InstitutionService();