export interface Author {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    title: string;
    category: string;
    publishingYear: number;
    author: Author;
}

export interface Member {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface BorrowedBook {
    id: number;
    book: Book;
    member: Member;
    borrowDate: string;
    returnDate: string;
}
