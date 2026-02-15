import { User } from "@/libraries/_entites/user";
import { DeleteResult, UpdateResult } from "typeorm";

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUserInput = {
  name: string;
  email: string;
};

export type ResetUserPasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export interface IUserManagement {
  create: (input: CreateUserInput) => Promise<void>;
  delete: (userId: number) => Promise<DeleteResult>;
  get: (userId: number) => Promise<User | null>;
  list: () => Promise<User[]>;
  update: (userId: number, data: Partial<User>) => Promise<UpdateResult>;
  resetPassword: (userId: number, newPassword: string) => Promise<UpdateResult>;
}
