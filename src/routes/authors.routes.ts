import {Router, Request, Response } from 'express'
import {AuthorsFindAll} from '../repositories/authors.repository.js'
const routerAuthor = Router();

routerAuthor.get('/', (req, res) => {
  res.send(AuthorsFindAll());
});


export default routerAuthor;