import {Request, Response } from 'express'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {User} from "../types/user.ts"
import { Login } from '../services/login.service.ts';

export async function postLogin (req: Request, res: Response){
    const { email, password } = req.body;
    Login(email, password);
}