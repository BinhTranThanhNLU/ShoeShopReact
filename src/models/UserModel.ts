import type {RoleModel} from "./RoleModel.ts";

export interface UserModel {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
    roleName?: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    role: RoleModel;
}