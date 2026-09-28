import {Router, Request, Response } from 'express'
import { getAuthor, getAuthors } from '../controllers/authors.controller.ts';
const routerAuthor = Router();

routerAuthor.get('/', async (req, res) => {
  await getAuthors(res);
});

routerAuthor.get('/:id', async (req, res) => {
  await getAuthor(req, res);
});

export default routerAuthor;