import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
    faCaretDown
} from "@fortawesome/pro-regular-svg-icons";
import FontFamilyPicker from "./Fontfamilypicker";
import FontSizePicker from "./FontSizepicker";
import { HexColorPicker } from "react-colorful";
const TextSettings = ({
    block,
    index,
    updateBold,
    updateItalic,
    updateUnderline,
    updateAlignment,
    updateTextColor,
    updateFontFamily,
    updateFontSize,
    moveBlockUp,
    moveBlockDown,
    setBlocks,
    setActiveBlockId,
    showColorPicker,
    setShowColorPicker,
    showAlignmentDropdown,
    setShowAlignmentDropdown,
    alignmentRef,
    pickerRef,
    handleAlignmentSelect
}) => {
    return (
        <div
            className="p-4 inline-flex gap-4 items-center bg-white rounded shadow relative z-60"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Font Size Dropdown */}
            <FontSizePicker block={block} updateFontSize={updateFontSize} />

            {/* Bold Icon */}
            <button
                onClick={() => updateBold(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                <span>B</span>
            </button>

            {/* Italic Icon */}
            <button
                onClick={() => updateItalic(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                <span style={{ fontStyle: "italic" }}>I</span>
            </button>

            {/* Underline Icon */}
            <button
                onClick={() => updateUnderline(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                <span style={{ textDecoration: block.isUnderlined ? "underline" : "none" }}>U</span>
            </button>

            {/* Alignment Dropdown */}
            <div className="relative" ref={alignmentRef}>
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAlignmentSelect(block, align);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={align === "left" ? faAlignLeft : align === "center" ? faAlignCenter : faAlignRight}
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
                    className="border rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-100"
                >
                    <div
                        style={{
                            backgroundColor: block.color || "#000000",
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    ></div>
                    <span>Color</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {showColorPicker && (
                    <div className="absolute z-20 mt-2" ref={pickerRef} style={{ left: "100%", top: "0" }}>
                        <HexColorPicker
                            color={block.textColor || "#000000"}
                            onChange={(newColor) => updateTextColor(block.id, newColor)}
                        />
                    </div>
                )}
            </div>

            {/* Font Family Picker */}
            <FontFamilyPicker block={block} updateFontFamily={updateFontFamily} />

            {/* Move Controls */}
            <div className="flex items-center gap-1">
                <button onClick={() => moveBlockUp(index)} className="bg-gray-200 px-2 py-1 rounded text-xs">↑</button>
                <button onClick={() => moveBlockDown(index)} className="bg-gray-200 px-2 py-1 rounded text-xs">↓</button>
            </div>

            {/* Trash Icon */}
            <button
                onClick={() => setBlocks((prev) => prev.filter((b) => b.id !== block.id))}
                className="text-red-500 hover:text-red-700"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>

            {/* Close Button */}
            <button
                onClick={() => setActiveBlockId(null)}
                className="text-gray-500 hover:text-gray-800 absolute top-1 right-1"
            >
                ✖
            </button>
        </div>
    );
};

export default TextSettings;
