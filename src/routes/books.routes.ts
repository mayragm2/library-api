import {Router, Request, Response } from 'express'
import {BookFindById, BookFindAll, BookCreate, BookDelete} from '../repositories/books.repository.ts'
import { getBooks, postBook, deleteBook, updateBook} from '../controllers/books.controller.ts';
import router from '../docs.ts';
export const routerBooks = Router();

routerBooks.get('/:id', async (req, res) => {
    await getBooks(req, res);
    });

routerBooks.get('/', async (req, res) => {
    const items = await BookFindAll();
    res.send(items);
})

routerBooks.post('/', async (req, res) => {
    await postBook(req, res);
})

routerBooks.delete('/:id', async (req, res) => {
   await deleteBook(req, res);
})

routerBooks.patch('/:id', async (req, res) => {
    await updateBook(req, res);
})
export default routerBooks;