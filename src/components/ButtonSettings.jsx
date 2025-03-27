import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faCaretDown,
  faLink,
  faTrash
} from "@fortawesome/pro-regular-svg-icons";
import { HexColorPicker } from "react-colorful";
import BorderRadiusPicker from "./BorderRadiusPicker";
import FontSizePicker from "./FontSizepicker";

const ButtonSettings = ({
  block,
  index,
  updateAlignment,
  updateTextColor,
  updateButtonBgColor,
  updateFontSize,
  updateBorderRadius,
  updateButtonLinkType,
  updateButtonLinkValue,
  moveBlockUp,
  moveBlockDown,
  setBlocks,
  setActiveBlockId
}) => {
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showLinkOptions, setShowLinkOptions] = useState(false);

  // Refs for outside-click detection
  const textColorPickerRef = useRef(null);
  const bgColorPickerRef = useRef(null);

  // Close text color picker if click is outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        textColorPickerRef.current &&
        !textColorPickerRef.current.contains(e.target)
      ) {
        setShowTextColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close background color picker if click is outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        bgColorPickerRef.current &&
        !bgColorPickerRef.current.contains(e.target)
      ) {
        setShowBgColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteBlock = () => {
    setBlocks((prev) => prev.filter((b) => b.id !== block.id));
  };

  const handleAlignmentSelect = (alignment) => {
    updateAlignment(block.id, alignment);
    setShowAlignmentDropdown(false);
  };

  const handleLinkOptionChange = (e) => {
    updateButtonLinkType(block.id, e.target.value);
  };

  const handleLinkValueChange = (e) => {
    updateButtonLinkValue(block.id, e.target.value);
  };

  const handleCloseBar = () => {
    setActiveBlockId(null);
  };

  return (
    <div
      className="p-4 inline-flex gap-4 items-center bg-white rounded shadow relative z-60"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Alignment Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowAlignmentDropdown(!showAlignmentDropdown)}
          className="border rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-100"
        >
          {block.alignment === "center" && <FontAwesomeIcon icon={faAlignCenter} />}
          {block.alignment === "right" && <FontAwesomeIcon icon={faAlignRight} />}
          {(!block.alignment || block.alignment === "left") && <FontAwesomeIcon icon={faAlignLeft} />}
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
        <label className="text-sm text-gray-600 block mb-1">Text Color:</label>
        <button
          onClick={() => setShowTextColorPicker(!showTextColorPicker)}
          className="border rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-100"
        >
          <div
            style={{
              backgroundColor: block.color || "#000000",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          <span>Pick</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showTextColorPicker && (
          <div className="absolute z-20 mt-2" ref={textColorPickerRef} style={{ left: "100%", top: "0" }}>
            <HexColorPicker
              color={block.textColor || "#000000"}
              onChange={(newColor) => updateTextColor(block.id, newColor)}
            />
          </div>
        )}
      </div>

      {/* Background Color Picker */}
      <div className="relative">
        <label className="text-sm text-gray-600 block mb-1">Background:</label>
        <button
          onClick={() => setShowBgColorPicker(!showBgColorPicker)}
          className="border rounded px-2 py-1 flex items-center gap-1 hover:bg-gray-100"
        >
          <div
            style={{
              backgroundColor: block.backgroundColor || "#007bff",
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
          <span>Pick</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showBgColorPicker && (
          <div className="absolute z-20 mt-2" ref={bgColorPickerRef} style={{ left: "100%", top: "0" }}>
            <HexColorPicker
              color={block.bgColor || "#007bff"}
              onChange={(newColor) => updateButtonBgColor(block.id, newColor)}
            />
          </div>
        )}
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Font Size:</label>
        <FontSizePicker block={block} updateFontSize={updateFontSize} />
      </div>

      {/* Border Radius */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Radius:</label>
        <BorderRadiusPicker block={block} updateBorderRadius={updateBorderRadius} />
      </div>

      {/* Link Options Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowLinkOptions(!showLinkOptions)}
          className="border rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faLink} />
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {showLinkOptions && (
          <div className="absolute z-20 mt-2 bg-white border rounded shadow-md p-2 w-64">
            <label className="block text-sm text-gray-600 mb-1">Link Type:</label>
            <select
              value={block.linkType || "url"}
              onChange={(e) => updateButtonLinkType(block.id, e.target.value)}
              className="w-full border px-2 py-1 rounded mb-2"
            >
              <option value="url">Link to URL</option>
              <option value="next-step">Go to Next Step</option>
              <option value="dismiss">Dismiss Guide</option>
              <option value="trigger">Trigger a Guide</option>
            </select>
            {block.linkType === "url" && (
              <input
                type="text"
                value={block.linkValue || ""}
                onChange={(e) => updateButtonLinkValue(block.id, e.target.value)}
                placeholder="https://example.com"
                className="w-full border px-2 py-1 rounded"
              />
            )}
          </div>
        )}
      </div>

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

      {/* Trash Icon */}
      <button onClick={handleDeleteBlock} className="text-red-500 hover:text-red-700 ml-auto">
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Close Button (X) */}
      <button onClick={handleCloseBar} className="text-gray-500 hover:text-gray-800 absolute top-1 right-1">
        ✖
      </button>
    </div>
  );
};

export default ButtonSettings;
