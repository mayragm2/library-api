import { Op } from "sequelize";
import { User as UserModel } from "../models/index.ts";
import { Book } from "../types/book.ts";
import { promises } from "dns";

export async function UsersFindAll ():Promise<User[] | null> {
    const row = await BookModel.findAll({ where: { available: true } });     // ... WHERE available = true
    return row;
}