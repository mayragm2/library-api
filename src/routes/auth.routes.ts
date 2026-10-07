import {Router, Request, Response } from 'express'
import { postLogin, postSignup } from '../controllers/auth.controller.ts';
const routerLogin = Router();

routerLogin.post('/login', async (req, res) => {
await postLogin(req, res);
return;
});

routerLogin.post('/signup', async (req, res) => {
    await postSignup(req, res);
    return;
})

export default routerLogin;
