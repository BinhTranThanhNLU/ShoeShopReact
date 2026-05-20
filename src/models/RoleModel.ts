export interface RoleModel {
    id: number;
    name: string;
}
export interface UserModel {
    id: number;
    fullName: string;
    email: string;
    phone: string | null;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    role: RoleModel | null;
}