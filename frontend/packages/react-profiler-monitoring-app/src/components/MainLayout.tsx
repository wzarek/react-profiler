import { useEffect, useRef } from "react";
import { useGetEvents } from "../api/useGetEvents";
import EventTypeCountChart from "./charts/EventTypeCountChart";
import TimeTakenChart from "./charts/TimeTakenChart";
import { FilterBar } from "./FilterBar";
import ErrorList from "./ErrorList";

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
    <main className="w-full min-h-screen">
      <div className="h-full w-4/5 mx-auto grid grid-cols-2 gap-24">
        <div className="shadow-xl p-8 rounded-lg bg-neutral-800">
          <FilterBar
            eventTypes={new Set(data.map((d) => d.event_type))}
            locations={new Set(data.map((d) => d.location))}
          />
          <TimeTakenChart
            data={data}
            lastUpdatedAt={lastKnownDataUpdatedAt.current}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="shadow-xl p-8 rounded-lg bg-neutral-800 h-[50vh]">
            <ErrorList
              errors={data
                .filter((d) => d.event_type === "error")
                .sort((a, b) => b.timestamp - a.timestamp)}
              lastUpdatedAt={lastKnownDataUpdatedAt.current}
            />
          </div>
          <div className="shadow-xl p-8 rounded-lg bg-neutral-800 h-[30vh]">
            <EventTypeCountChart data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
