import {Router, Request, Response } from 'express'
import { getAuthor, getAuthors } from '../controllers/authors.controller.ts';
import { postLogin } from '../controllers/login.controller.ts';
const routerLogin = Router();

routerLogin.post('/login', async (req, res) => {
postLogin(req, res);
});

export default routerLogin;
