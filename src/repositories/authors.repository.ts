import { Op } from "sequelize";
import {Author as AuthorModel} from "../models/index.ts";
import { Author } from "../types/author.ts";

export async function AuthorsFindAll () {
    const row = await AuthorModel.findAll();
    return row ? row : null;                                  // SELECT * FROM books
}
export async function AuthorFindById (id:number):Promise<Author | null> {
    const row = await AuthorModel.findByPk(id);
    return row;                                  // SELECT * FROM books
}
