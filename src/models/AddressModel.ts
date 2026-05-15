export interface AddressModel {
    id: number;
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
    idUser: number;
    default?: boolean;
    isDefault?: boolean;
}