import { Op } from "sequelize";
import { User as UserModel } from "../models/index.ts";
import { User } from "../types/user.ts";
import { promises } from "dns";

export async function UsersFindAll ():Promise<User[] | null> {
    const row = await UserModel.findAll();     // ... WHERE available = true
    return row;
}