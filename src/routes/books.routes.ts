import {Router, Request, Response } from 'express'
import {BookFindById} from '../repositories/books.repository.js'
import { searchBooks } from '../controllers/books.controller.ts';
const routerBooks = Router();

routerBooks.get('/:id', async (req, res) => {
    const { id } = req.params;
    const items = await BookFindById(Number(id))
    res.json(items);
});

routerBooks.search('/:filters', )

export default routerBooks;