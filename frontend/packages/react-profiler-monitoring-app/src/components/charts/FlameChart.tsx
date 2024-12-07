import { FC, useMemo } from "react";
import { FlameChartNode } from "flame-chart-js";
import { FlameChartComponent } from "flame-chart-js/react";
import { EventResponse } from "../../types/events";

type FlameChartProps = {
  data: EventResponse[];
};

const FlameChart: FC<FlameChartProps> = ({ data }) => {
  const minTimestamp = Math.min(...data.map((event) => event.timestamp));
  const flameChartParsedData: FlameChartNode[] = useMemo(() => {
    return data.slice(0, 10).map((event) => {
      return {
        name: event.title,
        duration: event.time_taken || 0.001,
        start: event.timestamp - minTimestamp,
      };
    });
  }, [data, minTimestamp]);

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <FlameChartComponent data={flameChartParsedData} />
    </div>
  );
};

export default FlameChart;
