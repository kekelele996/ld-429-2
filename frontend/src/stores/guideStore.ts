import { create } from 'zustand';
import type { GuideAnnotation } from '../types';
import { annotations } from '../api/mockGallery';

interface GuideState {
  annotations: GuideAnnotation[];
  activeAnnotationId?: string;
  setActiveAnnotation: (id?: string) => void;
}

export const useGuideStore = create<GuideState>((set) => ({
  annotations,
  activeAnnotationId: annotations[0]?.id,
  setActiveAnnotation: (id) => set({ activeAnnotationId: id }),
}));
