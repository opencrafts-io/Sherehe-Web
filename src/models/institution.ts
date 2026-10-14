export interface Institution {
    institutionId: number;
    name: string;
}

export interface InstitutionDto {
    institution_id: number;
    name: string;
}

export function mapInstitutionDtoToInstitution(dto: InstitutionDto): Institution {
    return {
        institutionId: dto.institution_id,
        name: dto.name,
    };
}