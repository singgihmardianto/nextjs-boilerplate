"use server";
import { UserManagementRepository } from "@/libraries/_services/repository/UserManagementRepository";
import { UserManagementService } from "@/libraries/_services/UserManagementService";

const handler = new UserManagementService(new UserManagementRepository());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createNewUser(data: FormData): Promise<any> {
  try {
    return handler.createUser({
      name: data.get("name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
  } catch (error: Error | unknown) {
    throw error instanceof Error ? error : new Error("Failed to create user.");
  }
}

export { createNewUser };
