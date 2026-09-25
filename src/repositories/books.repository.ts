import { Op } from "sequelize";
import { Book as BookModel, Author } from "../models/index.ts";
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
    await BookModel.create({ title: titleReq, year: yearReq, author_id: author_idReq });    // INSERT
}

export async function BookDelete (id:number) {
await BookModel.destroy({ where: { id: id} });
}


// await Book.count({ where: { author_id: 2 } });          // SELECT COUNT(*) ...


