import * as LoginRepository from "../repositories/login.repository.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";


export async function Login(email:string, password:string) {
const users = await LoginRepository.UsersFindAll();
if (!users){
    return "NO_USERS_FOUND"
} else {
    const user = users.find((u) => u.email === email);
    if (!user) {
        return "INVALID_CREDENTIALS";
    } else {
        const passwordOk = await bcrypt.compare(password, user.passwordHash);
        if (!passwordOk) return "INVALID_CREDENTIALS";
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret){
            return "AUTH_SERVICE_FAILED"
        } else {
            const token = jwt.sign({ email, role: user.role }, jwt_secret, {
            expiresIn: "1h",
            });
            return token;
        }
    }

}

}