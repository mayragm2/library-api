import * as BooksRepository from "../repositories/books.repository.ts";
import * as LoansRepository from "../repositories/loans.repository.ts";
import * as AuthorRepository from "../repositories/authors.repository.ts";
import { Book } from "../types/book.ts"; 

export async function remove(id: number): Promise<"DELETED" | "BOOK_NOT_FOUND" | "HAS_LOANS"> {
  const book = await BooksRepository.BookFindById(id);
  if (!book) return "BOOK_NOT_FOUND";

  const loanCount = await LoansRepository.countByBook(id);
  if (loanCount > 0) return "HAS_LOANS";

  await BooksRepository.BookDelete(id);
  return "DELETED";
}

export async function getById(id: number) {
  return await BooksRepository.BookFindById(id);
}

export async function getAll() {
  return await BooksRepository.BookFindAll();
}

export async function create(titleReq:string, yearReq:number, author_idReq:number): Promise <Book | "AUTHOR_NOT_FOUND"> {
    const author = await AuthorRepository.AuthorFindById(author_idReq);
    if (!author){
        return "AUTHOR_NOT_FOUND"
    }
    const newBook = await BooksRepository.BookCreate(titleReq, yearReq, author_idReq);
    return newBook;
}

export async function update (id: number, data: { title?: string; year?: number; author_id?: number }): Promise <Book | "AUTHOR_NOT_FOUND" | "BOOK_NOT_FOUND"> {
  const book = await BooksRepository.BookFindById(id);
  if (!book) {
    return "BOOK_NOT_FOUND";
  }

    
  if (data.author_id !== undefined) {
        const author = await AuthorRepository.AuthorFindById(data.author_id)
        if (!author){
        return "AUTHOR_NOT_FOUND";
        }
  }

  const updated = await BooksRepository.BookUpdate(id, data);
  if (!updated){
    return "BOOK_NOT_FOUND";
  } 
  else {
    return updated;
  }

}