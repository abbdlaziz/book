import type {Author} from "../type";
import {api} from "./api.ts";

const BASE_URL = '/authors';

export const getAllAuthors = async (): Promise<Author[]> => {
    const response = await api.get(BASE_URL);
    return response.data;
};

export const getAuthorById = async (id: number): Promise<Author> => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const response = await api.post(BASE_URL, author);
    return response.data;
};