import { create } from "zustand";

type OutlierMode = "All" | "Hide" | "Only";

type Filters = {
  timestampFrom: number | null;
  timestampTo: number | null;
  eventType: string | null;
  location: string | null;
  titleQuery: string;
  outlierMode: OutlierMode;
};

type FilterStore = {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {
    timestampFrom: null,
    timestampTo: null,
    eventType: null,
    location: null,
    titleQuery: "",
    outlierMode: "All",
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },
}));
