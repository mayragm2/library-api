import {Request, Response } from 'express'
import {BookFindAll, BookFindById, BookCreate, BookDelete} from '../repositories/books.repository.js'

export async function getBooks(req: Request, res: Response) {
    const { id } = req.params;
    const bookId = Number(id)
    if (Number.isNaN(bookId)) {
        res.status(400).json({ "error": "ID is not a number" })
        return;
    }
    const bookData = await BookFindById(bookId);
    
    if (!bookData){
        res.status(404).json({ "error": "Book not found" })
        return;
    } else {
    res.json(bookData);
    return
    }
}

export async function postBook(req: Request, res:Response) {
        const {title, year, author_id} = req.params;
        const yearNum = Number(year);
        const authorIdNum = Number(author_id);
            if (Number.isNaN(yearNum)) {
            res.status(400).json({ "error": "Year is not a number" })
            return;
        } else if (Number.isNaN(authorIdNum)){
            res.status(400).json({ "error": "Author ID is not a number" })
            return;
        } else {
        await BookCreate(title, parseInt(year), parseInt(author_id));
        res.status(201).json("Book created")
        return
        } 
}

export async function deleteBook(req: Request, res:Response) {
     const { id } = req.params;
    const bookId = Number(id)

    if (Number.isNaN(bookId)) {
        res.status(400).json({ "error": "ID is not a number" })
        return;
    } 
    const book = await BookFindById(bookId);
    if (!book){
        res.status(404).json({ "error": "Book not found" })
        return;
    } else if (!book.available){
        res.status(409).json({ "error": "Book has loans" })
        return;
    } else {
        await BookDelete(bookId);
        res.status(204).send();
        return;
    }
}
