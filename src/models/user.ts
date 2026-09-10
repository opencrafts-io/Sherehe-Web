export interface User {
    avatarUrl: string;
    bio: string;
    createdAt: string;
    deletedAt: string;
    email: string;
    id: string;
    name: string;
    nationalId: string;
    onboarded: boolean;
    phone: string;
    termsAccepted: boolean;
    type: string;
    updatedAt: string;
    username: string;
    vibePoints: number;
}

export interface UserDto {
    avatar_url: string;
    bio: string;
    created_at: string;
    deleted_at: string;
    email: string;
    id: string;
    name: string;
    national_id: string;
    onboarded: boolean;
    phone: string;
    terms_accepted: boolean;
    type: string;
    updated_at: string;
    username: string;
    vibe_points: number;
}

export function mapUserDtoToUser(dto: UserDto): User {
    return {
        avatarUrl: dto.avatar_url,
        bio: dto.bio,
        createdAt: dto.created_at,
        deletedAt: dto.deleted_at,
        email: dto.email,
        id: dto.id,
        name: dto.name,
        nationalId: dto.national_id,
        onboarded: dto.onboarded,
        phone: dto.phone,
        termsAccepted: dto.terms_accepted,
        type: dto.type,
        updatedAt: dto.updated_at,
        username: dto.username,
        vibePoints: dto.vibe_points,
    };
}