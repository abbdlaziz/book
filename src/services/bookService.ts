import type {Book} from "../type";
import {api} from "./api.ts";

const BASE_URL = '/books';

export const getAllBooks = async (): Promise<Book[]> => {
    const response = await api.get(BASE_URL);

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
    const response = await api.get(`${BASE_URL}/${id}`);
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
    const payload = {
        ...book,
        authorId: book.author.id,
        authorName: book.author.name,
    };

    const response = await api.post(BASE_URL, payload);
    return response.data;
};

export const updateBook = async (id: number, book: Book) => {
    const payload = {
        ...book,
        authorId: book.author.id,
        authorName: book.author.name,
    };

    const response = await api.put(`${BASE_URL}/${id}`, payload);
    return response.data;
};

export const deleteBook = async (id: number) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
};