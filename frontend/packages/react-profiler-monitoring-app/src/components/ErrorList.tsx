import { FC } from "react";
import { EventResponse } from "../types/events";

type ErrorListProps = {
  errors: EventResponse[];
  lastUpdatedAt: number;
};

const ErrorList: FC<ErrorListProps> = ({ errors, lastUpdatedAt }) => {
  if (!errors.length) {
    return (
      <div>
        <h2 className="py-6 text-xl font-semibold">Latest Errors</h2>
        No errors found
      </div>
    );
  }

  return (
    <>
      <h2 className="py-6 text-xl font-semibold">Latest Errors</h2>
      <div className="h-[38vh] overflow-auto">
        {errors.map((error, index) => (
          <div key={index} className="border-b border-gray-200 py-4 relative">
            <div className="flex justify-between">
              <h3 className="text-sm text-gray-400 font-semibold">
                {!!lastUpdatedAt && error.timestamp > lastUpdatedAt && (
                  <span className="text-red-500 font-semibold text-lg mr-2">
                    NEW
                  </span>
                )}
                {error.location}
              </h3>
              <p className="text-sm text-gray-300">
                {new Date(error.timestamp).toLocaleString()}
              </p>
            </div>
            <p className="font-semibold">{error.title}</p>
            <p className="text-sm text-gray-400">{error.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ErrorList;
