import { useMemo } from "react";
import { EventResponse } from "../types/events";
import { useFilterStore } from "../store/filterStore";

export const useFilteredEvents = (data: EventResponse[]) => {
  const filters = useFilterStore((state) => state.filters);

  const filteredData = useMemo(() => {
    return data.filter((event) => {
      if (
        filters.timestampFrom !== null &&
        event.timestamp < filters.timestampFrom
      ) {
        return false;
      }

      if (
        filters.timestampTo !== null &&
        event.timestamp > filters.timestampTo
      ) {
        return false;
      }

      if (filters.eventType && event.event_type !== filters.eventType) {
        return false;
      }

      if (filters.location && event.location !== filters.location) {
        return false;
      }

      if (
        filters.titleQuery &&
        !event.title.toLowerCase().includes(filters.titleQuery.toLowerCase())
      ) {
        return false;
      }

      if (filters.outlierMode === "Hide" && event.is_outlier) {
        return false;
      }

      if (filters.outlierMode === "Only" && !event.is_outlier) {
        return false;
      }

      return true;
    });
  }, [data, filters]);

  return filteredData;
};
