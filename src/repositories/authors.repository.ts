import { Op } from "sequelize";
import { Book, Author } from "../models/index.js";

export async function AuthorsFindAll () {
    const row = await Author.findAll();
    return row ? row : null;                                  // SELECT * FROM books
}
