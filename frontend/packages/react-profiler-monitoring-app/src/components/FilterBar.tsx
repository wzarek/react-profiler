import { FC } from "react";
import { useFilterStore } from "../store/filterStore";
import { Dropdown } from "./form/Dropdown";

type FilterBarProps = {
  eventTypes: Set<string>;
  locations: Set<string>;
};

export const FilterBar: FC<FilterBarProps> = ({ eventTypes, locations }) => {
  const { filters, setFilters } = useFilterStore();

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-medium">Timestamp From</span>
        <input
          type="number"
          className="border border-gray-300 rounded py-1 px-2"
          value={filters.timestampFrom ?? ""}
          onChange={(e) =>
            setFilters({
              timestampFrom: e.target.value ? Number(e.target.value) : null,
            })
          }
        />
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-medium">Timestamp To</span>
        <input
          type="number"
          className="border border-gray-300 rounded py-1 px-2"
          value={filters.timestampTo ?? ""}
          onChange={(e) =>
            setFilters({
              timestampTo: e.target.value ? Number(e.target.value) : null,
            })
          }
        />
      </div>
      <Dropdown
        label="Event Type"
        options={Array.from(eventTypes)}
        value={filters.eventType}
        onChange={(val) => setFilters({ eventType: val })}
      />
      <Dropdown
        label="Location"
        options={Array.from(locations)}
        value={filters.location}
        onChange={(val) => setFilters({ location: val })}
      />
      <div className="flex flex-col space-y-1">
        <span className="text-sm font-medium">Title</span>
        <input
          type="text"
          className="border border-gray-300 rounded py-1 px-2"
          value={filters.titleQuery}
          onChange={(e) => setFilters({ titleQuery: e.target.value })}
        />
      </div>
      <Dropdown
        label="Outliers"
        options={["Hide", "Only"]}
        value={filters.outlierMode}
        onChange={(val) =>
          setFilters({
            outlierMode: val as "Hide" | "Only",
          })
        }
      />
    </div>
  );
};
