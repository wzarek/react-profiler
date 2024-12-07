import { useEffect, useRef } from "react";
import { useGetEvents } from "../api/useGetEvents";
import EventTypeCountChart from "./charts/EventTypeCountChart";
import TimeTakenChart from "./charts/TimeTakenChart";
import { FilterBar } from "./FilterBar";

const MainLayout = () => {
  const { data, dataUpdatedAt, isLoading, isError } = useGetEvents("mad");

  const currentTimestamp = useRef<number>(0);
  const lastKnownDataUpdatedAt = useRef<number>(0);

  useEffect(() => {
    if (
      currentTimestamp.current &&
      currentTimestamp.current > lastKnownDataUpdatedAt.current
    ) {
      lastKnownDataUpdatedAt.current = currentTimestamp.current;
    }

    if (dataUpdatedAt) {
      currentTimestamp.current = dataUpdatedAt;
    }
  }, [dataUpdatedAt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="min-h-screen h-full w-4/5 mx-auto flex flex-col gap-32 py-12">
      <FilterBar
        eventTypes={new Set(data.map((d) => d.event_type))}
        locations={new Set(data.map((d) => d.location))}
      />
      <TimeTakenChart
        data={data}
        lastUpdatedAt={lastKnownDataUpdatedAt.current}
      />
      <EventTypeCountChart data={data} />
    </div>
  );
};

export default MainLayout;
