import type {OrderModel} from "../models/OrderModel";
import type {UserModel} from "../models/UserModel";

export interface ProfileMenuProps {
    orders: OrderModel[] | null;
    user: UserModel | null;
}

export interface OrderTabProps {
    orders: OrderModel[] | null;
}

export interface OrderCardProps {
    order: OrderModel;
}

export interface TrackingOrderProps {
    order: OrderModel;
}

export interface OrderDetailProps {
    order: OrderModel;
}

export interface SettingTabProps {
    user: UserModel | null;
    onUserUpdated: () => void;
}