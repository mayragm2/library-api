import { Op } from "sequelize";
import { Book as BookModel, Author } from "../models/index.ts";
import { Book } from "../types/book.ts";

export async function BookFindById (id:number):Promise<Book | null> {
    const row = await BookModel.findByPk(id);
    return row ? row.toJSON() : null;                                  // SELECT * FROM books
}
// await Book.findAll({ where: { available: true } });     // ... WHERE available = true
// await Book.findByPk(3);                                 // ... WHERE id = 3   → Book | null
// await Book.findAll({ include: { model: Author, as: "author" } }); // JOIN con authors
// await Book.create({ title: "...", year: 1963, author_id: 7 });    // INSERT
// await Book.destroy();                                   // DELETE de una instancia
// await Book.count({ where: { author_id: 2 } });          // SELECT COUNT(*) ...


