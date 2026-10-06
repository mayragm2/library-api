import {Request, Response } from 'express'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {User} from "../types/user.ts"
import { Login } from '../services/login.service.ts';

export async function postLogin (req: Request, res: Response){
    const { email, password } = await req.body;
    console.log(req.body);
    const loginData = await Login(email, password);
    if (loginData === "AUTHENTICATED"){
        res.status(200).json("Authenticated")
    } else {
        res.status(401).json("wrong credentials")
    }
    return;
}