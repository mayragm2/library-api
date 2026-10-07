import { Op } from "sequelize";
import { User as UserModel } from "../models/index.ts";
import { User } from "../types/user.ts";
import { promises } from "dns";
import bcrypt from "bcryptjs";

export async function UsersFindAll ():Promise<User[] | null> {
    const row = await UserModel.findAll();     // ... WHERE available = true
    return row;
}

export async function UserSignUp (email:string, password:string, role:string){
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({ email: email, passwordHash: hashedPassword, role: role });    // INSERT
    return (newUser);
}