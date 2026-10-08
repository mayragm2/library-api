import { Op } from "sequelize";
import { Book as BookModel } from "../models/index.ts";
import { Book } from "../types/book.ts";
import { promises } from "dns";

export async function BookFindById (id:number):Promise<Book | null> {
    const row = await BookModel.findByPk(id);
    return row;                                  // SELECT * FROM books
}

export async function BookFindAll ():Promise<Book[] | null> {
    const row = await BookModel.findAll({ where: { available: true } });     // ... WHERE available = true
    return row;
}
// await Book.findByPk(3);                                 // ... WHERE id = 3   → Book | null
// await Book.findAll({ include: { model: Author, as: "author" } }); // JOIN con authors
export async function BookCreate (titleReq:string, yearReq:number, author_idReq:number){
    const newBook = await BookModel.create({ title: titleReq, year: yearReq, author_id: author_idReq });    // INSERT
    return (newBook);
}

export async function BookDelete (id:number) {
await BookModel.destroy({ where: { id: id} });
}

export async function BookUpdate(id: number, data: { title?: string; year?: number; author_id?: number }) {
    await BookModel.update(data, { where: { id } });
    return await BookModel.findByPk(id);
}