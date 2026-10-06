import {Router, Request, Response } from 'express'
import { getAuthor, getAuthors } from '../controllers/authors.controller.ts';
import { postLogin } from '../controllers/login.controller.ts';
const routerLogin = Router();

routerLogin.post('/', async (req, res) => {
await postLogin(req, res);
return;
});

export default routerLogin;
