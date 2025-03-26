import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTextSize, faH1, faImage, faVideo, faRectangleWide, faCircleDot, faInputText, faFileLines, faTrash, faGear } from '@fortawesome/pro-regular-svg-icons';
import { useOutsideClick } from "./useOutsideClick";
import ImageSettings from "./ImageSettings";
import VideoSettings from "./VideoSettings";
import VideoBlock from "./VideoBlock";
import TextSettings from "./TextSettings";
import HeaderSettings from "./HeaderSettings";
import ButtonSettings from "./ButtonSettings";
import RadioSettings from "./RadioSettings";
import SmallInputSettings from "./SmallInputSettings";
import LargeInputSettings from "./LargeInputSettings";


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
  const pickerRef = useRef(null);

  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [showAlignmentDropdown, setShowAlignmentDropdown] = useState(false);

  // We'll store each block's DOM node in a ref object, keyed by block.id
  const blockRefs = useRef({});

  // We'll keep track of the settings bar position here
  const [settingsPos, setSettingsPos] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Use a ref to store a unique id counter.
  const idCounterRef = useRef(1);

  // Close the color picker when clicking outside
  // Use the hook to close the color picker when clicking outside the popup
  useOutsideClick(pickerRef, () => {
    setShowColorPicker(false);
    setShowHeadingDropdown(false);
    setShowAlignmentDropdown(false);
  });

  // Inserts a new block after the given index.
  const addBlock = (index, type) => {
    const newBlock = { id: idCounterRef.current, type, content: "" };
    if (type === "radio") {
      newBlock.content = ["Option ", "Option ", "Option "];
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
    positionSettingsBar(blockId);
  };

  const positionSettingsBar = (blockId) => {
    const element = blockRefs.current[blockId];
    if (!element) return; // safety check

    // Get bounding rect in the viewport
    const rect = element.getBoundingClientRect();

    // For an absolutely-positioned element in the document:
    // offset by the current scroll positions
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Decide exactly where you want to place the bar:
    // For example, directly below the block:
    const x = rect.left + scrollLeft;
    const y = rect.bottom + scrollTop;

    setSettingsPos({ x, y });
    console.log("Settings bar position set to:", x, y);
  };



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

  // Update the font family
  const updateFontFamily = (blockId, fontFamily) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, fontFamily } : block
      )
    );
  };

  // Update the font size
  const updateFontSize = (blockId, fontSize) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId) { return { ...block, fontSize }; } else { return block; }
      })
    );
  };

  // Update the image width

  const updateImageWidth = (blockId, width) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, width } : block
      )
    );
  };

  // Update the border radius
  const updateBorderRadius = (blockId, borderRadius) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, borderRadius } : block
      )
    );
  };

  // update video width
  const updateVideoWidth = (blockId, width) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, width } : block
      )
    );
  };

  // Update the video controls
  const updateVideoControls = (blockId, controls) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, controls } : block
      )
    );
  };

  // Update the video loop
  const updateVideoLoop = (blockId, loop) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, loop } : block
      )
    );
  };

  // Update the video autoplay
  const updateVideoAutoplay = (blockId, autoplay) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, autoplay } : block
      )
    );

    console.log("Video autoplay updated for block ID:", blockId, "to", autoplay);
  };

  // update background color
  const updateButtonBgColor = (blockId, backgroundColor) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, backgroundColor } : block
      )
    );
  };

  // update button link value
  const updateButtonLinkValue = (blockId, linkValue) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, linkValue } : block
      )
    );
  };

  // update button link type
  const updateButtonLinkType = (blockId, linkType) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === blockId ? { ...block, linkType } : block
      )
    );
  };

  // add radio option 
  const addRadioOption = (blockId) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId) {
          return {
            ...block,
            content: [...block.content, "New Option"],
          };
        }
        return block;
      })
    );
  };

  //update radio title
  const updateRadioTitle = (blockId, newTitle) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId && block.type === "radio") {
          return {
            ...block,
            title: newTitle,
          };
        }
        return block;
      })
    );
  };

  // update input title
  const updateInputTitle = (blockId, newTitle) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId && block.type === "smallinput") {
          return {
            ...block,
            title: newTitle,
          };
        }
        return block;
      })
    );
  };

  // update large input title
  const updateLargeInputTitle = (blockId, newTitle) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === blockId && block.type === "largeinput") {
          return {
            ...block,
            title: newTitle,
          };
        }
        return block;
      })
    );
  };



  const alignmentRef = useRef(null);
  const headingRef = useRef(null);


  // Close dropdowns when clicking outsid
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alignmentRef.current && !alignmentRef.current.contains(event.target)) {
        setShowAlignmentDropdown(false);
      }
      if (headingRef.current && !headingRef.current.contains(event.target)) {
        setShowHeadingDropdown(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setActiveBlockId(null); // Close settings bar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveBlockId]);


  function renderSettingsBar(block, index) {
    console.log(">> renderSettingsBar => block:", block, "index:", index);
    switch (block.type) {
      case "text":
        return (
          <TextSettings
            block={block}
            index={index}
            updateBold={updateBold}
            updateItalic={updateItalic}
            updateUnderline={updateUnderline}
            updateFontSize={updateFontSize}
            updateFontFamily={updateFontFamily}
            updateTextColor={updateTextColor}
            updateAlignment={updateAlignment}
            handleAlignmentSelect={handleAlignmentSelect}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            alignmentRef={alignmentRef}
            pickerRef={pickerRef}
            showAlignmentDropdown={showAlignmentDropdown}
            setShowAlignmentDropdown={setShowAlignmentDropdown}
          />
        );
      case "header":
        return (
          <HeaderSettings
            block={block}
            index={index}
            updateBold={updateBold}
            updateItalic={updateItalic}
            updateUnderline={updateUnderline}
            updateFontFamily={updateFontFamily}
            updateTextColor={updateTextColor}
            updateHeadingLevel={updateHeadingLevel}
            updateAlignment={updateAlignment}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );
      case "image":
        return (
          <ImageSettings block={block} index={index} updateImageWidth={updateImageWidth} updateBorderRadius={updateBorderRadius} setBlocks={setBlocks} setActiveBlockId={setActiveBlockId} setCurrentImageBlockId={setCurrentImageBlockId} fileInputRef={fileInputRef} moveBlockDown={moveBlockDown} moveBlockUp={moveBlockUp} />
        );
      case "video":
        return (
          <VideoSettings
            block={block}
            index={index}
            videoInputRef={videoInputRef}
            setCurrentVideoBlockId={setCurrentVideoBlockId}
            updateVideoWidth={updateVideoWidth}
            updateBorderRadius={updateBorderRadius}
            updateVideoControls={updateVideoControls}
            updateVideoLoop={updateVideoLoop}
            updateVideoAutoplay={updateVideoAutoplay}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );
      case "button":
        return (
          <ButtonSettings
            block={block}
            index={index}
            updateTextColor={updateTextColor}
            updateButtonBgColor={updateButtonBgColor}
            updateBorderRadius={updateBorderRadius}
            updateFontSize={updateFontSize}
            updateAlignment={updateAlignment}
            updateButtonLinkType={updateButtonLinkType}
            updateButtonLinkValue={updateButtonLinkValue}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );
      case "radio":
        return (
          <RadioSettings
            block={block}
            index={index}
            updateFontFamily={updateFontFamily}
            updateTextColor={updateTextColor}
            addRadioOption={addRadioOption}
            updateAlignment={updateAlignment}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );
      case "smallinput":
        return (
          <SmallInputSettings
            block={block}
            index={index}
            updateFontFamily={updateFontFamily}
            updateTextColor={updateTextColor}
            updateAlignment={updateAlignment}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );
      case "largeinput":
        return (
          <LargeInputSettings
            block={block}
            index={index}
            updateFontFamily={updateFontFamily}
            updateTextColor={updateTextColor}
            updateAlignment={updateAlignment}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            setBlocks={setBlocks}
            setActiveBlockId={setActiveBlockId}
          />
        );

      default:
        return (
          <div className="p-2">
            <p>No specific settings for this type.</p>
          </div>
        );
    }
  }




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
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative max-h-[584px] overflow-y-scroll  ">
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
                      className="relative group p-3 border border-transparent hover:border-blue-600"
                      ref={(el) => (blockRefs.current[block.id] = el)}

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
                          style={{ textAlign: block.alignment, color: block.color, textDecoration: block.isUnderlined ? 'underline' : 'none', fontWeight: block.isBold ? 'bold' : 'normal', fontStyle: block.isItalic ? 'italic' : 'normal', fontFamily: block.fontFamily, fontSize: block.fontSize }}
                        >
                          {block.content || "Enter text..."}
                        </div>
                      )}
                      {block.type === "header" && (() => {

                        const TagName = block.level || "h2";

                        // 2. Map the heading level to a Tailwind class

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
                            style={{ textAlign: block.alignment, color: block.color, textDecoration: block.isUnderlined ? 'underline' : 'none', fontWeight: block.isBold ? 'bold' : 'normal', fontStyle: block.isItalic ? 'italic' : 'normal', fontFamily: block.fontFamily }}
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
                                style={{
                                  width: block.width || "100%",
                                  borderRadius: block.borderRadius || "0",
                                  maxWidth: "100%",
                                  height: "auto",
                                  objectFit: "cover",
                                }}
                              />

                            ) : (
                              <div className="text-gray-500">No image selected</div>
                            )}
                          </div>

                        </div>
                      )}
                      {block.type === "video" && (
                        <div className="flex items-center justify-center">
                          <div>
                            {block.content ? (
                              <VideoBlock block={block} />


                            ) : (
                              <div className="text-gray-500">No video selected</div>
                            )}
                          </div>
                        </div>
                      )}

                      {block.type === "button" && (
                        <button
                          className="px-4 py-2 rounded"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateBlockContent(block.id, e.target.innerText)}
                          style={{
                            backgroundColor: block.backgroundColor || "#2563eb", // default blue
                            color: block.color || "white",
                            borderRadius: block.borderRadius || "8px",
                            fontSize: block.fontSize || "16px",
                            textAlign: block.alignment || "center",
                          }}
                        >
                          {block.content || "Button"}
                        </button>
                      )}

                      {block.type === "radio" && (
                        <div
                          style={{
                            textAlign: block.alignment || "left",
                            color: block.color || "#000000",
                            fontFamily: block.fontFamily || "inherit",
                          }}
                          className="p-2"
                        >
                          {/* Editable Title */}
                          <div
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newTitle = e.currentTarget.textContent.trim();
                              updateRadioTitle(block.id, newTitle);
                            }}
                            className="mb-4 text-lg font-semibold outline-none"
                            style={{
                              textAlign: block.alignment || "left",
                              fontFamily: block.fontFamily || "inherit",
                              color: block.color || "#000000",
                            }}
                          >
                            {block.title || "Untitled Question"}
                          </div>

                          {/* Radio Options */}
                          {block.content.map((option, i) => (
                            <div
                              key={i}
                              // If alignment is "right", use row-reverse so the input is visually on the right
                              className={`group relative flex items-center mb-2 ${block.alignment === "right" ? "flex-row-reverse" : ""
                                }`}
                              style={{
                                // Left, center, or right alignment for the whole row
                                justifyContent:
                                  block.alignment === "center"
                                    ? "center"
                                    : block.alignment === "right"
                                      ? "flex-end"
                                      : "flex-start",
                              }}
                            >
                              {/* Radio input (first in DOM, but row-reverse puts it on the right visually) */}
                              <input
                                type="radio"
                                name={`radio-${block.id}`}
                                id={`radio-${block.id}-${i}`}
                                className="mr-2"
                              />

                              {/* Editable label text using a callback ref to prevent cursor jump */}
                              <span
                                // A "callback ref" sets the textContent only if needed,
                                // so React won't overwrite user edits mid-typing.
                                ref={(node) => {
                                  if (node && node.textContent !== option) {
                                    node.textContent = option;
                                  }
                                }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                  const newText = e.currentTarget.textContent.trim();
                                  if (newText !== "") {
                                    updateRadioOption(block.id, i, newText);
                                  }
                                }}
                                className="p-1 rounded w-full outline-none"
                                style={{
                                  color: block.color || "#000000",
                                  fontFamily: block.fontFamily || "inherit",
                                  textAlign: block.alignment || "left",
                                }}
                              />

                              {/* Trash icon; on the left side if alignment === 'right', else right side */}
                              <button
                                type="button"
                                onClick={() => removeRadioOption(block.id, i)}
                                className={`absolute ${block.alignment === 'right' ? 'left-0 ml-2' : 'right-0 mr-2'
                                  } opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 z-10`}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {block.type === "smallinput" && (
                        <div
                          style={{
                            textAlign: block.alignment || "left",
                            color: block.color || "#000000",
                            fontFamily: block.fontFamily || "inherit",
                          }}
                          className="p-2"
                        >
                          {/* Editable Title for the input label */}
                          <div
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newTitle = e.currentTarget.textContent.trim();
                              updateInputTitle(block.id, newTitle);
                            }}
                            className="mb-2 text-base font-semibold outline-none"
                            style={{
                              textAlign: block.alignment || "left",
                            }}
                          >
                            {block.title || "Enter Label..."}
                          </div>

                          {/* Actual input box */}
                          <input
                            type="text"
                            placeholder="Enter some text..."
                            style={{
                              textAlign: block.alignment || "left",
                              color: block.color || "#000000",
                              fontFamily: block.fontFamily || "inherit",

                            }}
                            className="border rounded px-2 py-1 w-full"

                          />
                        </div>
                      )}

                      {block.type === "largeinput" && (
                        <div
                          style={{
                            textAlign: block.alignment || "left",
                            color: block.color || "#000000",
                            fontFamily: block.fontFamily || "inherit",
                          }}
                          className="p-2"
                        >
                          {/* Editable Title (similar to small input) */}
                          <div
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newTitle = e.currentTarget.textContent.trim();
                              updateLargeInputTitle(block.id, newTitle);
                            }}
                            className="mb-2 text-base font-semibold outline-none"
                            style={{
                              textAlign: block.alignment || "left",
                            }}
                          >
                            {block.title || "Enter Label..."}
                          </div>

                          {/* Actual Textarea */}
                          <textarea
                            placeholder="Enter a longer text..."
                            style={{
                              textAlign: block.alignment || "left",
                              color: block.color || "#000000",
                              fontFamily: block.fontFamily || "inherit",
                            }}
                            className="border rounded p-2 w-full h-32 resize-none"
                          />
                        </div>
                      )}

                      {/* Gear Icon (hidden by default, appears on hover) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlockClick(block.id);
                        }}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-800
               opacity-0 group-hover:opacity-100
               bg-transparent border-none shadow-none p-0 cursor-pointer
               transition-opacity duration-200"
                      >
                        <FontAwesomeIcon icon={faGear} />
                      </button>


                      {/* Plus button  */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => {
                            setTooltipIndex(index);
                            e.stopPropagation();
                          }}

                          className="bg-blue-600 text-white p-1 rounded-full shadow"
                        >
                          +
                        </button>
                      </div>


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
            {activeBlockId && (() => {
                  console.log(">> activeBlockId is:", activeBlockId);
                  const activeBlock = blocks.find((b) => b.id === activeBlockId);
                  console.log("   Found block:", activeBlock);

                  if (!activeBlock) return null;
                  const activeIndex = blocks.findIndex((b) => b.id === activeBlockId);
                  console.log("   Index is:", activeIndex);

                  return (
                    <div
                      ref={settingsRef}
                      style={{ position: "absolute", left: settingsPos.x, top: settingsPos.y, zIndex: 9999 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {renderSettingsBar(activeBlock, activeIndex)}
                    </div>
                  );
                })()}
          </div>
        </div>
      )}

    </div>

  );
};
