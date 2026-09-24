import {Request, Response } from 'express'
import {BookFindById} from '../repositories/books.repository.js'

export async function searchBooks(req: Request, res: Response) {
  const id = JSON.parse(req.params.id)
  const response = await BookFindById(id);
  res.send(response);
}