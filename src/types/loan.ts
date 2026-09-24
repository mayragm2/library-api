interface Loan {
   id: number;
   book_id: number;
   member_name: string;
   loan_date: string;
   return_date: string | null;
}

interface NewLoan {
   book_id: number;
   member_name: string;
}