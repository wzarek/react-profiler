import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { EventResponse } from "../types/events";

const getEvents = async (): Promise<EventResponse[]> => {
  const response = await fetch("http://localhost:8000/events/all");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
};

export const useGetEvents = (): UseQueryResult<EventResponse[], Error> => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 30000,
    retry: 2,
  });
};
