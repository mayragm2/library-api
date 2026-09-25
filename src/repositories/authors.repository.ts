import { Op } from "sequelize";
import { Book, Author } from "../models/index.js";

export async function AuthorFindById(id: number) {
    const row = await Author.findByPk(id);
    return row ? row.toJSON() : null;
}