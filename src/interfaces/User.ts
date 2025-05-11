export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddUserModel = Omit<UserModel, "id" | "createdAt" | "updatedAt">;

export interface AuthenticateUserModel {
  token: string;
  user: Omit<UserModel, "password">;
}

export interface AuthenticateUserRequest {
  email: string;
  password: string;
}
