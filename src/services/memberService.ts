import type {Member} from "../type";
import {api} from "./api.ts";

const BASE_URL = '/members';

export const getAllMembers = async (): Promise<Member[]> => {
    const response = await api.get(BASE_URL);
    return response.data;
};

export const getMemberById = async (id: number): Promise<Member> => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await api.post(BASE_URL, member);
    return response.data;
};

export const updateMember = async (id: number, member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await api.put(`${BASE_URL}/${id}`, member);
    return response.data;
};