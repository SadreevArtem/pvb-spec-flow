import { create } from "zustand";

interface MaterialStore {
  selectedMaterialFlangesStore: string;
  setSelectedMaterialFlangesStore: (material: string) => void;
}

export const useMaterialFlangesStore = create<MaterialStore>((set) => ({
  selectedMaterialFlangesStore: "",
  setSelectedMaterialFlangesStore: (material) =>
    set({ selectedMaterialFlangesStore: material }),
}));
