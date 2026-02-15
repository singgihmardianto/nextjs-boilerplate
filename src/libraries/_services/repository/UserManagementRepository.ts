import { IUserManagement, CreateUserInput } from "../contracts/UserManagement.interface";
import { getConnection } from "@/libraries/_services/Utils";
import { User } from "@/libraries/_entites/user";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserManagementRepository implements IUserManagement {
  async create(input: CreateUserInput): Promise<void> {
    const userRepository = await getConnection(User);
    const user = new User();
    Object.assign(user, input);
    await userRepository.save(user);
  }

  async delete(userId: number): Promise<DeleteResult> {
    const userRepository = await getConnection(User);
    return await userRepository.delete(userId);
  }

  async get(userId: number): Promise<User | null> {
    const userRepository = await getConnection(User);
    return await userRepository.findOneBy({ id: userId });
  }

  async list(): Promise<User[]> {
    const userRepository = await getConnection(User);
    return await userRepository.find();
  }

  async update(userId: number, data: Partial<User>): Promise<UpdateResult> {
    const userRepository = await getConnection(User);
    return await userRepository.update(userId, data);
  }

  async resetPassword(userId: number, newPassword: string): Promise<UpdateResult> {
    const userRepository = await getConnection(User);
    return await userRepository.update(userId, { password: newPassword });
  }
}
