import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextSize, faH1, faImage, faVideo, faRectangleWide, faCircleDot, faInputText, faFileLines, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { faHeading, faAlignCenter, faAlignRight, faAlignLeft, faCaretDown } from '@fortawesome/pro-regular-svg-icons';
import { SketchPicker } from "react-color";



export default function ModalBlockEditor() {
  const [showModal, setShowModal] = useState(false);
  // Each block has: id, type, content
  const [blocks, setBlocks] = useState([]);
  // For showing tooltip on a block; store the index of the block where plus was clicked.
  const [tooltipIndex, setTooltipIndex] = useState(null);
  // Store the ID of the new image block to update it later
  const [currentImageBlockId, setCurrentImageBlockId] = useState(null);
  const [currentVideoBlockId, setCurrentVideoBlockId] = useState(null);

  // For showing color picker
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);


  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Use a ref to store a unique id counter.
  const idCounterRef = useRef(1);

  // Inserts a new block after the given index.
  const addBlock = (index, type) => {
    const newBlock = { id: idCounterRef.current, type, content: "" };
    if (type === "radio") {
      newBlock.content = ["Option 1", "Option 2", "Option3"];
    }

    if (type === "header") {
      // Default to h2 if you like
      newBlock.level = "h2";
      // Optionally set alignment
      newBlock.alignment = "left";
    }


    idCounterRef.current += 1; // increment the counter
    const newBlocks = [...blocks];
    // if index is -1, insert at beginning.
    if (index === -1) {
      newBlocks.unshift(newBlock);
    } else {
      newBlocks.splice(index + 1, 0, newBlock);
    }
    setBlocks(newBlocks);
    setTooltipIndex(null);
    return newBlock.id;
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
  // When the "Image" button is clicked:
  const handleAddImageBlock = (index) => {
    const newId = addBlock(index, "image");
    setCurrentImageBlockId(newId);
    // Increase delay to 200ms to ensure the new block is added
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 200);
  };

  // File input change handler
  const handleFileChange = (id, file) => {
    console.log("File selected:", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("File loaded, result:", e.target.result);
      updateBlockContent(id, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddVideoBlock = (index) => {
    const newId = addBlock(index, "video");
    setCurrentVideoBlockId(newId);  // use the video-specific state
    setTimeout(() => {
      if (videoInputRef.current) {
        videoInputRef.current.click();
      }
    }, 200);
  };



  const updateRadioOption = (blockId, optionIndex, newText) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId && block.type === "radio") {
          // If content isn't an array, start with default options.
          const options = Array.isArray(block.content)
            ? [...block.content]
            : ["Option 1", "Option 2", "Option 3"];
          options[optionIndex] = newText;
          return { ...block, content: options };
        }
        return block;
      })
    );
  };

  const removeRadioOption = (blockId, optionIndex) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId && block.type === "radio" && Array.isArray(block.content)) {
          const options = [...block.content];
          options.splice(optionIndex, 1);
          return { ...block, content: options };
        }
        return block;
      })
    );
  };

  // Tracks which block is currently "active" (clicked on)
  const [activeBlockId, setActiveBlockId] = useState(null);

  // Toggles a block’s active state when clicked
  const handleBlockClick = (blockId) => {
    setActiveBlockId((prevId) => (prevId === blockId ? null : blockId));
  };

  function renderSettingsBar(block) {
    switch (block.type) {
      case "text":
        return (
          <div className="p-2">
            <p className="font-bold">Text Block Settings</p>
            {/* Example: text size toggle, color pickers, etc. */}
            <button className="border px-2 py-1 mr-2">B</button>
            <button className="border px-2 py-1">I</button>
          </div>
        );
      case "header":
        return (
          <HeaderSettings block={block} />
        );
      case "image":
        return (
          <div className="p-2">
            <p className="font-bold">Image Block Settings</p>
            {/* Example: image width, border radius, etc. */}
            <button className="border px-2 py-1 mr-2">Change URL</button>
            <button className="border px-2 py-1">Resize</button>
          </div>
        );
      default:
        return (
          <div className="p-2">
            <p>No specific settings for this type.</p>
          </div>
        );
    }
  }

  // Update the heading level (h1, h2, h3)
  const updateHeadingLevel = (blockId, newLevel) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, level: newLevel } : block
      )
    );
  };

  // Update the alignment (left, center, right)
  const updateAlignment = (blockId, alignment) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, alignment } : block
      )
    );
  };

  const handleHeadingSelect = (block, level) => {
    updateHeadingLevel(block.id, level);
    setShowHeadingDropdown(false);
  };

  const handleAlignmentSelect = (block, alignment) => {
    updateAlignment(block.id, alignment);
    setShowAlignmentDropdown(false);
  };

  // Update the text color
  const updateTextColor = (blockId, color) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, color } : block
      )
    );

  };

  // underline 
  const updateUnderline = (blockId) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? { ...block, isUnderlined: block.isUnderlined !== undefined ? !block.isUnderlined : true }
          : block
      )
    );
  };

  // Update the bold state
  const updateBold = (blockId) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? { ...block, isBold: block.isBold !== undefined ? !block.isBold : true }
          : block
      )
    );
  };
  // Update the italic state
  const updateItalic = (blockId) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId
          ? { ...block, isItalic: block.isItalic !== undefined ? !block.isItalic : true }
          : block
      )
    );
  };

    // Render the settings bar for a header block
    const HeaderSettings = ({ block }) => {

      return (
        <div className="p-4 bg-white shadow-md rounded flex  items-center space-x-4">
          {/* Heading Level Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {

                setShowHeadingDropdown(!showHeadingDropdown);
              }}
              className="border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faHeading} />

              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {showHeadingDropdown && (
              <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md">
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {

                    handleHeadingSelect(block, "h1");
                  }}
                >

                  <span>H1</span>
                </button>
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {

                    handleHeadingSelect(block, "h2");
                  }}
                >

                  <span>H2</span>
                </button>
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {

                    handleHeadingSelect(block, "h3");
                  }}
                >

                  <span>H3</span>
                </button>
              </div>
            )}
          </div>

          {/* Bold Icon */}
          <button
            onClick={() => {
              updateBold(block.id);
            }}
            className="text-gray-500 border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
          >
            <span>B</span>
          </button>

          {/* Italic Icon */}
          <button
            onClick={() => {
              updateItalic(block.id);
            }}
            className="text-gray-500 border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
          >
            <span 
            stlye ={{fontStyle: 'italic'}}
            >I</span>
          </button>

           {/* underline icon */}
           <button
            onClick={() => {
              updateUnderline(block.id);
            }}
            className="text-gray-500  ml-auto border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
          >
            <span style={{ textDecoration: block.isUnderlined ? 'underline' : 'none' }}>U</span>
          </button>

          {/* Alignment Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAlignmentDropdown(!showAlignmentDropdown);
              }}
              className="border rounded px-2 py-1 flex items-center space-x-1 hover:bg-gray-100"
            >
              {block.alignment === "center" && (
                <FontAwesomeIcon icon={faAlignCenter} />
              )}
              {block.alignment === "right" && (
                <FontAwesomeIcon icon={faAlignRight} />
              )}
              {(!block.alignment || block.alignment === "left") && (
                <FontAwesomeIcon icon={faAlignLeft} />
              )}
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {showAlignmentDropdown && (
              <div className="absolute z-10 mt-2 w-28 bg-white border border-gray-300 rounded shadow-md">
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAlignmentSelect(block, "left");
                  }}
                >
                  <FontAwesomeIcon icon={faAlignLeft} className="mr-2" />
                  <span>Left</span>
                </button>
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAlignmentSelect(block, "center");
                  }}
                >
                  <FontAwesomeIcon icon={faAlignCenter} className="mr-2" />
                  <span>Center</span>
                </button>
                <button
                  className="flex items-center w-full px-2 py-1 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAlignmentSelect(block, "right");
                  }}
                >
                  <FontAwesomeIcon icon={faAlignRight} className="mr-2" />
                  <span>Right</span>
                </button>
              </div>

            )}
          </div>
          {/* Text Color Picker */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
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
              <span>Text Color</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {showColorPicker && (
              <div className="absolute z-20 mt-2">
                <SketchPicker
                  color={block.color || "#000000"}
                  onChangeComplete={(color) => {
                    updateTextColor(block.id, color.hex);
                  }}
                />
              </div>
            )}
          </div>

         

          {/* Trash Icon */}
          <button
            onClick={() => {
              setBlocks((prevBlocks) =>
                prevBlocks.filter((b) => b.id !== block.id)
              );
            }}
            className="text-red-500 hover:text-red-700 ml-auto"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>




        </div>
      );
    };



    return (
      <div className="p-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Block Editor
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && currentImageBlockId) {
              handleFileChange(currentImageBlockId, file);
              setCurrentImageBlockId(null);
              e.target.value = ""; // Reset file input
            }
          }}
        />
        {/* hidden file input for video */}
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && currentVideoBlockId) {
              handleFileChange(currentVideoBlockId, file);
              setCurrentVideoBlockId(null);
              e.target.value = ""; // Reset file input
            }
          }}
        />

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
                  {blocks.map((block, index) => {

                    const isActive = block.id === activeBlockId;
                    return (
                      <div
                        key={block.id}
                        className="relative group p-4 border border-transparent hover:border-blue-600"
                        onClick={() => handleBlockClick(block.id)}
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
                        {block.type === "header" && (() => {
                          // 1. Decide which HTML tag to render based on block.level
                          const TagName = block.level || "h2";

                          // 2. Map the heading level to a Tailwind class
                          //    e.g., h1 => text-4xl, h2 => text-3xl, h3 => text-xl.
                          const headingSizeClass = (() => {
                            if (!block.level) return "text-2xl"; // fallback if somehow still undefined
                            switch (block.level) {
                              case "h1":
                                return "text-4xl";
                              case "h2":
                                return "text-3xl";
                              case "h3":
                                return "text-xl";
                              default:
                                return "text-2xl";
                            }
                          })();

                          return (
                            <TagName
                              contentEditable
                              suppressContentEditableWarning
                              style={{ textAlign: block.alignment, color: block.color, textDecoration: block.isUnderlined ? 'underline' : 'none', fontWeight: block.isBold ? 'bold' : 'normal', fontStyle: block.isItalic ? 'italic' : 'normal' }}
                              // Use the dynamic class instead of a fixed text size
                              className={`font-bold ${headingSizeClass} outline-none`}
                              onBlur={(e) => updateBlockContent(block.id, e.target.textContent)}
                            >
                              {block.content}
                            </TagName>
                          );
                        })()}
                        {block.type === "image" && (
                          <div>

                            <div className="flex items-center justify-center">
                              {block.content ? (
                                <img
                                  src={block.content}
                                  alt=""
                                  className="max-w-sm rounded "
                                />
                              ) : (
                                <div className="text-gray-500">No image selected</div>
                              )}
                            </div>

                          </div>
                        )}
                        {block.type === "video" && (
                          <div>
                            <div>
                              {block.content ? (
                                <video
                                  src={block.content}
                                  controls
                                  className="max-w-full w-full rounded"
                                />
                              ) : (
                                <div className="text-gray-500">No video selected</div>
                              )}
                            </div>
                          </div>
                        )}

                        {block.type === "button" && (
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              updateBlockContent(block.id, e.target.innerText)
                            }
                          >
                            {block.content || "Button"}
                          </button>
                        )}

                        {block.type === "radio" && (
                          <div>

                            {block.content.map((option, i) => (
                              <div
                                key={i}
                                className="group relative flex items-center space-x-2 mb-2"
                              >
                                <input
                                  type="radio"
                                  name={`radio-${block.id}`}
                                  id={`radio-${block.id}-${i}`}
                                  className="mr-2"
                                />
                                <span
                                  contentEditable
                                  suppressContentEditableWarning
                                  onBlur={(e) => {
                                    // If text isn't empty, update the option's text.
                                    const newText = e.currentTarget.textContent.trim();
                                    if (newText !== "") {
                                      updateRadioOption(block.id, i, newText);
                                    }
                                  }}
                                  className=" p-1 rounded w-full"
                                >
                                  {option}
                                </span>

                                {/* Trash icon (appears on hover) */}
                                <button
                                  type="button"
                                  onClick={() => removeRadioOption(block.id, i)}
                                  className="absolute right-0 mr-2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 z-10"
                                >
                                  < FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            ))}
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

                        {/* SETTINGS BAR (only rendered if the block is active) */}
                        {isActive && (
                          <div className="absolute left-0 -bottom-16 w-full bg-gray-100 border-t border-gray-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {renderSettingsBar(block)}
                          </div>
                        )}
                      </div>

                    )
                  })}


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
                            onClick={() => handleAddImageBlock(tooltipIndex)}
                            className="flex flex-col items-center bg-white px-3 py-6 rounded text-sm"
                          >
                            <FontAwesomeIcon icon={faImage} className="mb-1" size="xl" />
                            <span>Image</span>
                          </button>
                          <button
                            onClick={() => handleAddVideoBlock(tooltipIndex)}
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
  };
