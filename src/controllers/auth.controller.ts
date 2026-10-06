import {Request, Response } from 'express'
import "dotenv/config";
import {User} from "../types/user.ts"
import { Login , Signup} from '../services/auth.service.ts';

export async function postLogin (req: Request, res: Response){
    const { email, password } = await req.body;
    const loginData = await Login(email, password);
     if (loginData === "NO_USERS_FOUND"){
        res.status(401).json({"error":"No users found"})
    } else if (loginData === "AUTH_SERVICE_FAILED"){
        res.status(503).json({"error":"Authentication service failed"})
    } else if (loginData === "INVALID_CREDENTIALS"){
        res.status(401).json({"error":"Invalid credentials"})
    } else {
        res.status(200).json("Authenticated")
    }
    return;
}

export async function postSignup (req: Request, res: Response){
    const { email, password, role} = await req.body;
    console.log(email);
    const SignUpData = await Signup(email, password, role);
    res.status(201).json(SignUpData);
    return SignUpData;
}