import React from "react";
import { Bar } from "react-chartjs-2";
import { EventResponse } from "../../types/events";

type Props = {
  data: EventResponse[];
};

const EventTypeCountChart: React.FC<Props> = ({ data }) => {
  const eventCountByType = data.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const labels = Object.keys(eventCountByType);
  const values = labels.map((type) => eventCountByType[type]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Events per Type",
        data: values,
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
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
    <div className="max-h-[20vh]">
      <h2 className="py-6 text-xl font-semibold">Number of Events per Type</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EventTypeCountChart;
