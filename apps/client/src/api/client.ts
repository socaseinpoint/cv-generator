import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_URL.startsWith('http') ? API_URL : `https://${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CvDocument {
  id: string;
  title: string;
  markdownContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface CvListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCvRequest {
  title: string;
  markdownContent: string;
}

export interface UpdateCvRequest {
  title?: string;
  markdownContent?: string;
}

export type StyleType = 'classic' | 'modern' | 'minimal';

export const cvApi = {
  list: async (): Promise<CvListItem[]> => {
    const { data } = await apiClient.get('/cv');
    return data;
  },

  getById: async (id: string): Promise<CvDocument> => {
    const { data } = await apiClient.get(`/cv/${id}`);
    return data;
  },

  create: async (payload: CreateCvRequest): Promise<CvDocument> => {
    const { data } = await apiClient.post('/cv', payload);
    return data;
  },

  update: async (id: string, payload: UpdateCvRequest): Promise<CvDocument> => {
    const { data } = await apiClient.put(`/cv/${id}`, payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/cv/${id}`);
  },

  generatePdf: async (id: string, style: StyleType): Promise<Blob> => {
    const { data } = await apiClient.post(
      `/cv/${id}/generate`,
      { style },
      { responseType: 'blob' }
    );
    return data;
  },
};





