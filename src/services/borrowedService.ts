import type {BorrowedBook} from "../type";
import {api} from "./api.ts";

const BASE_URL = '/borrowed';

export const getAllBorrowedBooks = async (): Promise<BorrowedBook[]> => {
    const response = await api.get(BASE_URL);

    return response.data.map((bb: any) => ({
        id: bb.id,
        borrowDate: bb.borrowDate,
        returnDate: bb.returnDate,
        book: {
            id: bb.bookId,
            title: bb.bookTitle,
            category: '',
            publishingYear: 0,
            author: { id: 0, name: '' }
        },
        member: {
            id: bb.memberId,
            name: bb.memberName,
            email: '',
            phone: ''
        }
    }));
};

export const getBorrowedBookById = async (id: number): Promise<BorrowedBook> => {
    const response = await api.get(`${BASE_URL}/${id}`);
    const bb = response.data;

    return {
        id: bb.id,
        borrowDate: bb.borrowDate,
        returnDate: bb.returnDate,
        book: {
            id: bb.bookId,
            title: bb.bookTitle,
            category: '',
            publishingYear: 0,
            author: { id: 0, name: '' }
        },
        member: {
            id: bb.memberId,
            name: bb.memberName,
            email: '',
            phone: ''
        }
    };
};

export const createBorrowedBook = async (payload: {
    bookId: number;
    memberId: number;
    borrowDate: string;
    returnDate: string;
}) => {
    const response = await api.post(BASE_URL, payload);
    return response.data;
};

export const updateBorrowedBook = async (
    id: number,
    payload: {
        bookId: number;
        memberId: number;
        borrowDate: string;
        returnDate: string;
    }
) => {
    const response = await api.put(`${BASE_URL}/${id}`, payload);
    return response.data;
};