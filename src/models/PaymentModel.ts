export interface PaymentModel {
    id: number;
    method: string;
    status: string;
    transactionId?: string;
    amount: number;
    date: string;
}