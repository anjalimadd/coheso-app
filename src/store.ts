import create from "zustand";
import { RequestType } from "./types";

interface RequestTypeStore {
  requestTypes: RequestType[];
  setRequestTypes: (requestTypes: RequestType[]) => void;
  addRequestType: (newType: RequestType) => void;
  updateRequestType: (id: string, updatedType: RequestType) => void;
  deleteRequestType: (id: string) => void;
}

export const useRequestTypeStore = create<RequestTypeStore>((set) => ({
  requestTypes: [],
  setRequestTypes: (requestTypes: RequestType[]) => set({ requestTypes }),
  addRequestType: (newType) =>
    set((state) => ({ requestTypes: [...state.requestTypes, newType] })),
  updateRequestType: (id, updatedType) =>
    set((state) => ({
      requestTypes: state.requestTypes.map((type) =>
        type.id === id ? updatedType : type
      ),
    })),
  deleteRequestType: (id) =>
    set((state) => ({
      requestTypes: state.requestTypes.filter((type) => type.id !== id),
    })),
}));
