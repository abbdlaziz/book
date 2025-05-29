import axios from "axios";
import type {Member} from "../type";

const BASE_URL = 'http://47.236.246.176:8080/members';

export const getAllMembers = async (): Promise<Member[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getMemberById = async (id: number): Promise<Member> => {
    const response = await axios.get(`http://47.236.246.176:8080/members/${id}`);
    return response.data;
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await axios.post(BASE_URL, member);
    return response.data;
};

export const updateMember = async (id: number, member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await axios.put(`${BASE_URL}/${id}`, member);
    return response.data;
};
