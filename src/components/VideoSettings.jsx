import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
import BorderRadiusPicker from "./BorderRadiusPicker";

const VideoSettings = (props) => {
  const {
    block,
    updateVideoWidth,
    updateBorderRadius,
    updateVideoControls,  // toggles controls on/off
    updateVideoLoop,      // toggles loop on/off
    updateVideoAutoplay,  // toggles autoplay on/off
    moveBlockUp,
    moveBlockDown,
    setBlocks,
    setActiveBlockId,
    setCurrentVideoBlockId,
    videoInputRef,
    index,
    deleteBlock
  } = props;

  // Called when user moves the width slider.
  const handleWidthChange = (e) => {
    const newWidth = e.target.value + "px"; // store width as a string with px
    updateVideoWidth(block.id, newWidth);
  };

  // Called when the border radius picker changes.
  const handleBorderRadiusChange = (blockId, newRadius) => {
    updateBorderRadius(blockId, newRadius);
  };

  // Trigger the hidden file input for changing the video.
  const handleChangeVideo = () => {
    setCurrentVideoBlockId(block.id);
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  // Delete the block.
  const handleDeleteBlock = () => {
    deleteBlock(block.id);
  };

  // Close the settings bar.
  const handleCloseBar = () => {
    setActiveBlockId(null);
  };

  // Get the current width as a number (default to 300 if undefined).
  const widthValue = parseInt(block.width || "300", 10);

  return (
    <div
      className="p-4 inline-flex flex-wrap gap-4 items-center bg-white rounded shadow relative z-60"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Change Video Button */}
      <button
        onClick={handleChangeVideo}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Change Video
      </button>

      {/* Width Slider */}
      <div className="flex items-center gap-2">
        <label className="text-gray-600 text-sm">Width:</label>
        <input
          type="range"
          min="50"
          max="1000"
          value={widthValue}
          onChange={handleWidthChange}
          className="cursor-pointer"
        />
        <span className="text-sm text-gray-500">{widthValue}px</span>
      </div>

      {/* Border Radius Picker */}
      <div className="flex items-center gap-2">
        <label className="text-gray-600 text-sm">Radius:</label>
        <BorderRadiusPicker
          block={block}
          updateBorderRadius={handleBorderRadiusChange}
        />
      </div>

      {/* Video Controls Checkbox */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 flex items-center">
          <input
            type="checkbox"
            checked={block.controls || false}
            onChange={(e) =>
              updateVideoControls(block.id, e.target.checked)
            }
            className="mr-1"
          />
          Controls
        </label>
      </div>

      {/* Loop Checkbox */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 flex items-center">
          <input
            type="checkbox"
            checked={block.loop || false}
            onChange={(e) =>
              updateVideoLoop(block.id, e.target.checked)
            }
            className="mr-1"
          />
          Loop
        </label>
      </div>

      {/* Autoplay Checkbox */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 flex items-center">
          <input
            type="checkbox"
            checked={block.autoplay || false}
            onChange={(e) =>
              updateVideoAutoplay(block.id, e.target.checked)
            }
            className="mr-1"
          />
          Autoplay
        </label>
      </div>

      {/* Move Controls */}
      <div className="flex items-center gap-1">
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
      </div>

      {/* Trash Icon */}
      <button
        onClick={handleDeleteBlock}
        className="text-red-500 hover:text-red-700 ml-auto"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>

      {/* Close Button (X) */}
      <button
        onClick={handleCloseBar}
        className="text-gray-500 hover:text-gray-800 absolute top-1 right-1"
      >
        ✖
      </button>
    </div>
  );
};

export default VideoSettings;
