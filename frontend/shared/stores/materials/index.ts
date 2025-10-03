import { create } from "zustand";

interface MaterialStore {
  selectedMaterialStore: string;
  setSelectedMaterialStore: (material: string) => void;
}

export const useMaterialStore = create<MaterialStore>((set) => ({
  selectedMaterialStore: "",
  setSelectedMaterialStore: (material) =>
    set({ selectedMaterialStore: material }),
}));
