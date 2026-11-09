import axios, { type AxiosResponse } from 'axios';
import { type Note, type NewNote } from '../types/note';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
  totalNotes: number;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = '' } = params;
  const response: AxiosResponse<FetchNotesResponse> = await noteApi.get(
    '/notes',
    {
      params: {
        page,
        perPage,
        ...(search.trim() ? { search: search.trim() } : {}),
      },
    }
  );
  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.post('/notes', newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.delete(`/notes/${id}`);
  return response.data;
};