import * as LoginRepository from "../repositories/login.repository.ts";

export async function Login(email:string, password:string) {
 if (password === "password"){
    return "AUTHENTICATED"
 }
    
}