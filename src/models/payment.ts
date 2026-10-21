import type { Attendee } from "./attendee";

export interface Payment {
    message: string;
    transId: string | null;
}

export interface PaymentDto {
    message: string;
    trans_id: string | null;
}

export function mapPaymentDtoToPayment(dto: PaymentDto): Payment {
    return {
        message: dto.message,
        transId: dto.trans_id,
    };
}

export interface ConfirmPayment {
    status: string;
    attendee: Attendee[] | null;
}