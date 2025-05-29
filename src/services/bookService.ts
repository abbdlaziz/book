import type {Book} from "../type";
import axios from 'axios';

const BASE_URL = 'http://47.236.246.176:8080/books';


export const getAllBooks = async (): Promise<Book[]> => {
    const response = await axios.get(BASE_URL);

    // Transform raw response into expected Book type
    return response.data.map((b: any) => ({
        id: b.id,
        title: b.title,
        category: b.category,
        publishingYear: b.publishingYear,
        author: {
            id: b.authorId,
            name: b.authorName
        }
    }));
};

export const getBookById = async (id: number): Promise<Book> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    const data = response.data;

    return {
        id: data.id,
        title: data.title,
        category: data.category,
        publishingYear: data.publishingYear,
        author: {
            id: data.authorId,
            name: data.authorName,
        },
    };
};

export const createBook = async (book: Book) => {
    // Map nested author to flat backend structure
    const payload = {
        ...book,
        authorId: book.author.id,
        authorName: book.author.name, // if needed, or omit if backend fetches it
    };

    const response = await axios.post(BASE_URL, payload);
    return response.data;
};

export const updateBook = async (id: number, book: Book) => {
    const payload = {
        ...book,
        authorId: book.author.id,
        authorName: book.author.name,
    };

    const response = await axios.put(`${BASE_URL}/${id}`, payload);
    return response.data;
};

export const deleteBook = async (id: number) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};