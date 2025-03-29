import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-regular-svg-icons';
import BorderRadiusPicker from './BorderRadiusPicker';



const ImageSettings = (props) => {
    // Functions below (updateImageWidth, updateBorderRadius, moveBlockUp, etc.)
    // must exist in the same file or parent scope.
    // We'll reference them just like your text settings references updateBold, etc.

    const {
      block,
      updateImageWidth,
      updateBorderRadius,
      moveBlockUp,
      moveBlockDown,
      setBlocks,
      setActiveBlockId,
      setCurrentImageBlockId,
      fileInputRef,
     index,
     deleteBlock
    } = props;
  
    const handleWidthChange = (e) => {
      const newWidth = e.target.value + "px";
      updateImageWidth(block.id, newWidth);
    };
  
    const handleBorderRadiusChange = (blockId, newRadius) => {
      updateBorderRadius(blockId, newRadius);
    };
  
    const handleChangeImage = () => {
      // Mark this block as the one changing images
      setCurrentImageBlockId(block.id);
      // Trigger the hidden file input
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleDeleteBlock = () => {
      props.deleteBlock(block.id);
    };
  
    const handleCloseBar = () => {
      setActiveBlockId(null);
    };
  
    return (
      <div
        className="p-4 flex flex-wrap gap-4 items-center relative z-60 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Change Image */}
        <button
          onClick={handleChangeImage}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Change Image
        </button>
  
        {/* Width Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 text-sm">Width:</label>
          <input
            type="range"
            min="50"
            max="1000"
            value={parseInt(block.width || "300", 10)}
            onChange={handleWidthChange}
            className="cursor-pointer"
          />
          <span className="text-sm text-gray-500">
            {parseInt(block.width || "300", 10)}px
          </span>
        </div>
  
        {/* Border Radius Picker (React Select) */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 text-sm">Radius:</label>
          <BorderRadiusPicker
            block={block}
            updateBorderRadius={handleBorderRadiusChange}
          />
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

export default ImageSettings;
