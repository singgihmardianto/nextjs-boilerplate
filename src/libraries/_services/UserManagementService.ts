import { CreateUserInput, IUserManagement } from "./contracts/UserManagement.interface";
import crypto from "crypto";

export class UserManagementService {
  constructor(private userManagement: IUserManagement) {}

  async createUser(data: CreateUserInput) {
    if (!data.email.includes("@")) {
      throw new Error("Invalid email address");
    }

    if (data.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    if (data.name.trim() === "") {
      throw new Error("Name cannot be empty");
    }

    // encrypt password
    const hash = crypto.createHash("md5");
    data.password = hash.update(data.password).digest("hex");
    return this.userManagement.create(data);
  }
}
