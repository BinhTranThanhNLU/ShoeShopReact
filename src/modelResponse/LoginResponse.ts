import type {UserModel} from "../models/UserModel.ts";

export interface LoginResponse {
  token: string;
  user: UserModel;
}
