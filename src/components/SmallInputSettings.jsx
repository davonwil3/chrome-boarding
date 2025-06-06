import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faCaretDown,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { HexColorPicker } from "react-colorful";
import FontFamilyPicker from "./Fontfamilypicker";

const SmallInputSettings = ({
  block,
  index,
  updateFontFamily,
  updateTextColor,
  updateAlignment,
  moveBlockUp,
  moveBlockDown,
  setBlocks,
  setActiveBlockId,
  deleteBlock,
}) => {
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const alignmentRef = useRef(null);
  const pickerRef = useRef(null);

  const handleAlignmentSelect = (alignment) => {
    updateAlignment(block.id, alignment);
    setShowAlignmentDropdown(false);
  };

  return (
    <div
      className="p-4 inline-flex gap-4 items-center bg-white rounded shadow relative z-60"
      onClick={(e) => e.stopPropagation()}
    >
     
      {/* Alignment */}
      <div className="relative" ref={alignmentRef}>
        <button
          onClick={() => setShowAlignmentDropdown((prev) => !prev)}
          className="border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
        >
          <FontAwesomeIcon
            icon={
              block.alignment === "center"
                ? faAlignCenter
                : block.alignment === "right"
                ? faAlignRight
                : faAlignLeft
            }
          />
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showAlignmentDropdown && (
          <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md">
            {["left", "center", "right"].map((align) => (
              <button
                key={align}
                className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                onClick={() => handleAlignmentSelect(align)}
              >
                <FontAwesomeIcon
                  icon={
                    align === "left"
                      ? faAlignLeft
                      : align === "center"
                      ? faAlignCenter
                      : faAlignRight
                  }
                  className="mr-2"
                />
                <span>{align.charAt(0).toUpperCase() + align.slice(1)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Text Color Picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
        >
          <div
            style={{
              backgroundColor: block.color || "#000000",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <span>Color</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showColorPicker && (
          <div className="absolute z-20 mt-2" ref={pickerRef}  style={{ left: "100%", top: "0" }}>
            <HexColorPicker
              color={block.color || "#000000"}
              onChange={(newColor) => updateTextColor(block.id, newColor)}
            />
          </div>
        )}
      </div>

      {/* Font Family Picker */}
      <FontFamilyPicker block={block} updateFontFamily={updateFontFamily} />

      {/* Move Controls */}
      <button
        onClick={() => moveBlockUp(index)}
        className="bg-gray-200 px-2 py-1 rounded text-xs"
      >
        ↑
      </button>
      <button
        onClick={() => moveBlockDown(index)}
        className="bg-gray-200 px-2 py-1 rounded text-xs"
      >
        ↓
      </button>

      {/* Delete Block */}
      <button
        onClick={() => deleteBlock(block.id)}
        className="text-red-500 hover:text-red-700"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Close Settings */}
      <button
        onClick={() => setActiveBlockId(null)}
        className="text-gray-500 hover:text-gray-800 absolute top-1 right-1"
      >
        ✖
      </button>
    </div>
  );
};

export default SmallInputSettings;
