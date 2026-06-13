import { create } from 'zustand';
import type { Exhibition } from '../types';
import { exhibitions } from '../api/mockGallery';

interface ExhibitionState {
  exhibitions: Exhibition[];
  activeExhibitionId: string;
  setActiveExhibition: (id: string) => void;
}

export const useExhibitionStore = create<ExhibitionState>((set) => ({
  exhibitions,
  activeExhibitionId: exhibitions[0]?.id ?? '',
  setActiveExhibition: (id) => set({ activeExhibitionId: id }),
}));
