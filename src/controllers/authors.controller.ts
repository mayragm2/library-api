import {Request, Response } from 'express'
import {AuthorFindById, AuthorsFindAll} from '../repositories/authors.repository.ts'

export async function getAuthor(req: Request, res: Response) {
    const { id } = req.params;
    const authorId = Number(id)
    if (Number.isNaN(authorId)) {
        res.status(400).json({ "error": "ID is not a number" })
        return;
    }
    const authorData = await AuthorFindById(authorId);
    
    if (!authorData){
        res.status(404).json({ "error": "Author not found" })
        return;
    } else {
    res.json(authorData);
    return
    }
}

export async function getAuthors(res:Response) {
    const authorsData = await AuthorsFindAll();
    res.json(authorsData);
    return;
}