// FontFamilyPicker.js
import React from "react";
import Select from "react-select";

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  // Add more fonts as needed
];

const FontFamilyPicker = ({ block, updateFontFamily }) => {
  const selectedOption =
    fontOptions.find((option) => option.value === block.fontFamily) ||
    fontOptions[0];

  return (
    <div className="w-48">
      <Select
        options={fontOptions}
        value={selectedOption}
        onChange={(selected) => updateFontFamily(block.id, selected.value)}
        placeholder="Select Font"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default FontFamilyPicker;
