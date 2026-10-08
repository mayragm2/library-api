import * as AuthRepository from "../repositories/auth.repository.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { create } from "domain";
import logger from "../logger.ts"


export async function Login(email:string, password:string) {
const users = await AuthRepository.UsersFindAll();
if (!users){
    return "NO_USERS_FOUND"
} else {
    const user = users.find((u) => u.email === email);
    if (!user) {
        logger.warn(`User doesn't exist`);
        return "INVALID_CREDENTIALS";
    } else {
        const passwordOk = await bcrypt.compare(password, user.passwordHash);
        if (!passwordOk) {
            logger.warn(`Password was incorrect`);
            return "INVALID_CREDENTIALS";
        }
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret){
            logger.error(`No JWT Secret found`);
            return "AUTH_SERVICE_FAILED"
        } else {
            const token = jwt.sign({ email, role: user.role }, jwt_secret, {
            expiresIn: "1h",
            });
            logger.info(`Log In Successfull: ${email}`);
            return token;
        }
    }

}

}

export async function Signup(email:string, password:string, role: string) {
    const newUser = await AuthRepository.UserSignUp(email, password, role);
    logger.info(`New user registered: ${email} (role: ${role})`);
    return (newUser);
}