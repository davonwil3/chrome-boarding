import React from "react";
import Select from "react-select";

// Example options for border radiu
const borderRadiusOptions = [
  { value: "0px", label: "None" },
  { value: "5px", label: "Small (5px)" },
  { value: "10px", label: "Medium (10px)" },
  { value: "20px", label: "Large (20px)" },
  { value: "50%", label: "Circle (50%)" },
];

export default function BorderRadiusPicker({ block, updateBorderRadius }) {
  // Find the current selection or default to "None"
  const selectedOption =
    borderRadiusOptions.find((opt) => opt.value === block.borderRadius) ||
    borderRadiusOptions[0];

  return (
    <div className="w-32">
      <Select
        options={borderRadiusOptions}
        value={selectedOption}
        onChange={(selected) => updateBorderRadius(block.id, selected.value)}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
}
