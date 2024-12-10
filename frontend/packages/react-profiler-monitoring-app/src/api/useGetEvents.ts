import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AlgorithmType, EventResponse } from "../types/events";

export const useGetEvents = (
  algorithm: AlgorithmType
): UseQueryResult<EventResponse[], Error> => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8000/events/all/${algorithm}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = (await response.json()) as EventResponse[];

      data.filter((event) => {
        const eventDate = new Date(event.timestamp);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - eventDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1;
      });
    },
    staleTime: 30000,
    refetchInterval: 30000,
    retry: 2,
  });
};
