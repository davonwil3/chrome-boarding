import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextSize, faH1, faImage, faVideo, faRectangleWide, faCircleDot, faInputText, faFileLines } from '@fortawesome/pro-regular-svg-icons';

let idCounter = 1;

export default function ModalBlockEditor() {
  const [showModal, setShowModal] = useState(false);
  // Each block has: id, type, content
  const [blocks, setBlocks] = useState([]);
  // For showing tooltip on a block; store the index of the block where plus was clicked.
  const [tooltipIndex, setTooltipIndex] = useState(null);

  // Inserts a new block after the given index.
  const addBlock = (index, type) => {
    const newBlock = { id: idCounter++, type, content: "" };
    const newBlocks = [...blocks];
    // if index is -1, insert at beginning.
    if (index === -1) {
      newBlocks.unshift(newBlock);
    } else {
      newBlocks.splice(index + 1, 0, newBlock);
    }
    setBlocks(newBlocks);
    setTooltipIndex(null);
  };

  // Updates the content for a block.
  const updateBlockContent = (id, content) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((b) => (b.id === id ? { ...b, content } : b))
    );
  };

  // Moves a block up in the order.
  const moveBlockUp = (index) => {
    if (index === 0) return;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [
      newBlocks[index],
      newBlocks[index - 1],
    ];
    setBlocks(newBlocks);
  };

  // Moves a block down in the order.
  const moveBlockDown = (index) => {
    if (index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [
      newBlocks[index + 1],
      newBlocks[index],
    ];
    setBlocks(newBlocks);
  };


  return (
    <div className="p-4">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Block Editor
      </button>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
              <div className="">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className="relative group p-4 border border-transparent hover:border-blue-600"
                  >
                    {/* Editable content */}
                    {block.type === "text" && (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[40px] outline-none"
                        onBlur={(e) =>
                          updateBlockContent(block.id, e.target.innerText)
                        }
                      >
                        {block.content || "Enter text..."}
                      </div>
                    )}
                    {block.type === "header" && (
                      <h1
                        contentEditable
                        suppressContentEditableWarning
                        className="min-h-[40px] text-2xl font-bold outline-none"
                        onBlur={(e) =>
                          updateBlockContent(block.id, e.target.innerText)
                        }
                      >
                        {block.content || "Header"}
                      </h1>
                    )}
                    {block.type === "image" && (
                      <div>
                        <input
                          type="text"
                          placeholder="Enter image URL"
                          value={block.content}
                          onChange={(e) =>
                            updateBlockContent(block.id, e.target.value)
                          }
                          className="w-full border p-1 rounded mb-2"
                        />
                        {block.content && (
                          <img
                            src={block.content}
                            alt=""
                            className="max-w-full rounded"
                          />
                        )}
                      </div>
                    )}

                    {/* Move controls */}
                    <div className="absolute top-1 right-1 flex space-x-1">
                      <button
                        onClick={() => moveBlockUp(index)}
                        className="bg-gray-200 p-1 rounded text-xs"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveBlockDown(index)}
                        className="bg-gray-200 p-1 rounded text-xs"
                      >
                        ↓
                      </button>
                    </div>

                    {/* Plus button for adding new block */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() =>
                          setTooltipIndex(index)
                        }
                        className="bg-blue-600 text-white p-1 rounded-full shadow"
                      >
                        +
                      </button>
                    </div>


                  </div>
                ))}

                {/* If no blocks exist, show an Add button */}
                {blocks.length === 0 && (
                  <div className="text-center">
                    <button
                      onClick={() => addBlock(-1, "text")}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Add a Block
                    </button>
                  </div>
                )}
                {/* Tooltip with block options */}
                {tooltipIndex !== null && (
                  <div className="
                    fixed
                    top-1/2
                    left-1/2
                    transform
                    -translate-x-1/2
                    -translate-y-1/2
                    bg-white
                    border
                    p-4
                    rounded
                    shadow-md
                    z-10
                  ">
                    <div className="flex flex-col w-[400px] space-y-4">
                      {/* close button */}
                      <button
                        onClick={() => setTooltipIndex(null)}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
                      >
                        ✖
                      </button>
                      <h2 className="font-bold text-lg">
                        Add an element
                      </h2>
                      <p className="text-gray-500">
                        Elements are the building blocks of your guide. Add an element to get started.
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-2 bg-gray-100 p-4">
                        <button
                          onClick={() => addBlock(tooltipIndex, "text")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faTextSize} className="mb-1" size="xl" />
                          <span>Text</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "header")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faH1} className="mb-1" size="xl" />
                          <span>Header</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "image")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faImage} className="mb-1" size="xl" />
                          <span>Image</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "video")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faVideo} className="mb-1" size="xl" />
                          <span>Video</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "button")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faRectangleWide} className="mb-1" size="xl" />
                          <span>Button</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "radio")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faCircleDot} className="mb-1" size="xl" />
                          <span>Radio</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "smallinput")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faInputText} className="mb-1" size="xl" />
                          <span>Small Input</span>
                        </button>
                        <button
                          onClick={() => addBlock(tooltipIndex, "largeinput")}
                          className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                        >
                          <FontAwesomeIcon icon={faFileLines} className="mb-1" size="xl" />
                          <span>Large Input</span>
                        </button>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}
