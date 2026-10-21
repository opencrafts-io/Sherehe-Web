import { mapPaymentDtoToPayment, type ConfirmPayment, type Payment, type PaymentDto } from "../models/payment";
import { shereheApis } from "./api";

class PaymentService {
    async purchaseTicket(ticketId: string, ticketQuantity: number, phoneNumber?: string): Promise<Payment> {
        const response = await shereheApis.post<PaymentDto>(
            "/purchase",
            {
                "ticket_id": ticketId,
                "ticket_quantity": ticketQuantity,
                ...(phoneNumber && {
                    "user_phone": phoneNumber,
                }),
            },
        );

        return mapPaymentDtoToPayment(response.data);
    }

    async confirmPayment(transId: string): Promise<ConfirmPayment> {
        const response = await shereheApis.get<ConfirmPayment>(`/purchase/${transId}`);

        return response.data;
    }
}

export default new PaymentService();