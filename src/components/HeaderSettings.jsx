import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeading,
    faCaretDown,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
    faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { HexColorPicker } from "react-colorful";
import FontFamilyPicker from "./Fontfamilypicker";

const HeaderSettings = ({
    block,
    index,
    updateBold,
    updateItalic,
    updateUnderline,
    updateFontFamily,
    updateTextColor,
    updateHeadingLevel,
    updateAlignment,
    moveBlockUp,
    moveBlockDown,
    setBlocks,
    setActiveBlockId,
}) => {
    const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
    const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const headingRef = useRef(null);
    const alignmentRef = useRef(null);
    const pickerRef = useRef(null);

    const handleHeadingSelect = (level) => {
        updateHeadingLevel(block.id, level);
        setShowHeadingDropdown(false);
    };

    const handleAlignmentSelect = (alignment) => {
        updateAlignment(block.id, alignment);
        setShowAlignmentDropdown(false);
    };

    return (
        <div
            className="p-4 inline-flex  gap-4 items-center bg-white rounded shadow relative z-60"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Heading Level Dropdown */}
            <div className="relative" ref={headingRef}>
                <button
                    onClick={() => setShowHeadingDropdown((prev) => !prev)}
                    className="border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
                >
                    <FontAwesomeIcon icon={faHeading} />
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {showHeadingDropdown && (
                    <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md">
                        {["h1", "h2", "h3"].map((level) => (
                            <button
                                key={level}
                                className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                                onClick={() => handleHeadingSelect(level)}
                            >
                                <span>{level.toUpperCase()}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Bold */}
            <button
                onClick={() => updateBold(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                B
            </button>

            {/* Italic */}
            <button
                onClick={() => updateItalic(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                <span style={{ fontStyle: "italic" }}>I</span>
            </button>

            {/* Underline */}
            <button
                onClick={() => updateUnderline(block.id)}
                className="text-gray-500 border rounded px-2 py-1 hover:bg-gray-100"
            >
                <span
                    style={{
                        textDecoration: block.isUnderlined ? "underline" : "none",
                    }}
                >
                    U
                </span>
            </button>

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
                    ></div>
                    <span>Color</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {showColorPicker && (
                    <div className="absolute z-20 mt-2" ref={pickerRef}>
                        <HexColorPicker
                            color={block.textColor || "#000000"}
                            onChange={(newColor) => updateTextColor(block.id, newColor)}
                        />
                    </div>
                )}
            </div>

            {/* Font Family Picker */}
            <FontFamilyPicker
                block={block}
                updateFontFamily={updateFontFamily}
            />

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

            {/* Delete */}
            <button
                onClick={() =>
                    setBlocks((prev) => prev.filter((b) => b.id !== block.id))
                }
                className="text-red-500 hover:text-red-700"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>

            {/* Close */}
            <button
                onClick={() => setActiveBlockId(null)}
                className="text-gray-500 hover:text-gray-800 absolute top-1 right-1"
            >
                ✖
            </button>
        </div>
    );
};

export default HeaderSettings;
