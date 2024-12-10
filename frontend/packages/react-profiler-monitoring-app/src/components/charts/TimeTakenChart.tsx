import { FC } from "react";
import { Line } from "react-chartjs-2";
import { EventResponse } from "../../types/events";
import { useFilteredEvents } from "../../hooks/useFilteredEvents";

type Props = {
  data: EventResponse[];
  lastUpdatedAt: number;
};

const TimeTakenChart: FC<Props> = ({ data, lastUpdatedAt }) => {
  const filteredData = useFilteredEvents(data);

  const labels = filteredData.map(
    (event) =>
      `${new Date(event.timestamp).toLocaleString()} - ${event.location}`
  );
  const values = filteredData.map((event) => event.time_taken);
  const backgroundColors = filteredData.map((event) => {
    const isNew = event.timestamp > lastUpdatedAt;

    if (event.is_outlier && isNew) {
      return "rgba(255,0,0,0.4)";
    }

    if (event.is_outlier) {
      return "rgba(255,205,0,0.4)";
    }

    if (isNew) {
      return "rgba(11,255,84,0.4)";
    }

    return "rgba(75,140,190,0.4)";
  });
  const borderColors = filteredData.map((event) =>
    event.is_outlier ? "rgba(255,0,0,1)" : "rgba(75,192,192,1)"
  );

  const chartData = {
    labels,
    datasets: [
      {
        fill: {
          target: "origin",
          above: "rgba(255,205,0,0.4)",
        },
        label: "Time Taken (ms)",
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-h-[60vh]">
      <h2 className="py-6 text-xl font-semibold">Time taken chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeTakenChart;
