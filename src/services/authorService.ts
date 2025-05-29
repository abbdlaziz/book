import type {Author} from "../type";
import axios from "axios";

const BASE_URL = 'http://47.236.246.176:8080/authors';

export const getAllAuthors = async (): Promise<Author[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getAuthorById = async (id: number): Promise<Author> => {
    const response = await axios.get(`http://47.236.246.176:8080//authors/${id}`);
    return response.data;
};

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const response = await axios.post(BASE_URL, author);
    return response.data;
};