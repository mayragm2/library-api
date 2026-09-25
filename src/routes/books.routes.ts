import {Router, Request, Response } from 'express'
import {BookFindById, BookFindAll, BookCreate, BookDelete} from '../repositories/books.repository.js'
import { getBooks, postBook, deleteBook} from '../controllers/books.controller.ts';
import router from '../docs.ts';
export const routerBooks = Router();

routerBooks.get('/:id', async (req, res) => {
    await getBooks(req, res);
    });

routerBooks.get('/', async (req, res) => {
    const items = await BookFindAll();
    res.send(items);
})

routerBooks.post('/:title/:year/:author_id', async (req, res) => {
    await postBook(req, res);
})

routerBooks.delete('/:id', async (req, res) => {
   await deleteBook(req, res);
})
export default routerBooks;