import type {BorrowedBook} from "../type";
import axios from "axios";

const BASE_URL = 'http://47.236.246.176:8080/borrowed';


export const getAllBorrowedBooks = async (): Promise<BorrowedBook[]> => {
    const response = await axios.get(BASE_URL);

    return response.data.map((bb: any) => ({
        id: bb.id,
        borrowDate: bb.borrowDate,
        returnDate: bb.returnDate,
        book: {
            id: bb.bookId,
            title: bb.bookTitle,
            category: '', // optional: fill with default/empty if not available
            publishingYear: 0,
            author: {
                id: 0,
                name: ''
            }
        },
        member: {
            id: bb.memberId,
            name: bb.memberName,
            email: '',
            phone: ''
        }
    }));
};

export const createBorrowedBook = async (payload: {
    bookId: number;
    memberId: number;
    borrowDate: string;
    returnDate: string;
}) => {
    const response = await axios.post(BASE_URL, payload);
    return response.data;
};

export const getBorrowedBookById = async (id: number): Promise<BorrowedBook> => {
    const response = await axios.get(`http://47.236.246.176:8080/borrowed/${id}`);
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
            author: {
                id: 0,
                name: ''
            }
        },
        member: {
            id: bb.memberId,
            name: bb.memberName,
            email: '',
            phone: ''
        }
    };
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
    const response = await axios.put(`${BASE_URL}/${id}`, payload);
    return response.data;
};