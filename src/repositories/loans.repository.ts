import { Op } from "sequelize";
import {Loan as LoanModel} from "../models/index.ts";

export async function countByBook (bookId: number): Promise<number> {
    const row = await LoanModel.count({where: {book_id: bookId}})
    return row;                                  
}

