import {Request, Response } from 'express'
import { remove, getAll, getById, create, update } from '../services/books.service.ts';

export async function getBooks(req: Request, res: Response) {
    const { id } = req.params;
    const bookId = Number(id)
    if (Number.isNaN(bookId)) {
        res.status(400).json({ "error": "ID is not a number" })
        return;
    }
    const bookData = await getById(bookId);
    
    if (!bookData){
        res.status(404).json({ "error": "Book not found" })
        return;
    } else {
    res.json(bookData);
    return;
    }
}
export async function getAllBooks(req: Request, res: Response) {
    
    const booksData = await getAll();
    
    if (!booksData){
        res.status(404).json({ "error": "Book not found" })
        return;
    } else {
    res.json(booksData);
    return
    }
}
export async function postBook(req: Request, res:Response) {
        const {title, year, author_id} = req.body;
        const yearNum = Number(year);
        const authorIdNum = Number(author_id);
            if (Number.isNaN(yearNum)) {
            res.status(400).json({ "error": "Year is not a number" })
            return;
        } else if (Number.isNaN(authorIdNum)){
            res.status(400).json({ "error": "Author ID is not a number" })
            return;
        } else {
        const newBookData = await create(title, parseInt(year), parseInt(author_id));
        if (newBookData === 'AUTHOR_NOT_FOUND'){
            res.status(404).json({"error": "Author not found"});
            return;
        }else {
            res.status(201).json(newBookData);
            return;
        }
        } 
}

export async function deleteBook(req: Request, res:Response) {
    const { id } = req.params;
    const bookId = Number(id)
    
    if (Number.isNaN(bookId)) {
        res.status(400).json({ "error": "ID is not a number" })
        return;
    } 
    
    const response = await remove(bookId);

    if (response === "BOOK_NOT_FOUND"){
        res.status(404).json({ "error": "Book not found" })
        return;
    } else if (response === "HAS_LOANS"){
        res.status(409).json({ "error": "Book has loans" })
        return;
    } else {
        res.status(204).send();
        return;
    }
}

export async function updateBook (req: Request, res: Response) {
    const {id} = req.params;
    const IdToNum = Number(id);
    const { title, year, author_id} = req.body;
    const updateReturn = await update(IdToNum, {title, year, author_id});

    if (updateReturn === "BOOK_NOT_FOUND"){
        res.status(404).json('{"error": Book not found}');
    } else if (updateReturn === "AUTHOR_NOT_FOUND"){
        res.status(404).json('{"error": Author not found}');
    } else {
        res.status (200). json(updateReturn);
    }
}

  