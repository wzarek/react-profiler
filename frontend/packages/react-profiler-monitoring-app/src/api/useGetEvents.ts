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

      return response.json();
    },
    staleTime: 30000,
    refetchInterval: 30000,
    retry: 2,
  });
};
