
import React from "react";
import Select from "react-select";

const fontSizeOptions = [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px (Default)" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
    { value: "20px", label: "20px" },
    { value: "24px", label: "24px" },
    { value: "32px", label: "32px" },
    { value: "40px", label: "40px" },
    { value: "48px", label: "48px" },
  ];

  
const FontSizePicker = ({ block, updateFontSize }) => {
    const selectedOption =
        fontSizeOptions.find((option) => option.value === block.fontSize) ||
        fontSizeOptions[1];
    
    return (
        <div className="w-32">
        <Select
            options={fontSizeOptions}
            value={selectedOption}
            onChange={(selected) => updateFontSize(block.id, selected.value)}
            placeholder="Select Font Size"
            className="react-select-container"
            classNamePrefix="react-select"
            onClick = {() => console.log("Font Size Picker")}
        />
        </div>
    );
    };

export default FontSizePicker;
