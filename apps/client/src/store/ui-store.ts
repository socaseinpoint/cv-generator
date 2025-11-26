import { create } from 'zustand';
import { StyleType } from '../api/client';

interface UiStore {
  selectedStyle: StyleType;
  setSelectedStyle: (style: StyleType) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedStyle: 'classic',
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  isGenerating: false,
  setIsGenerating: (value) => set({ isGenerating: value }),
}));





