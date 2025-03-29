import React from "react";
import VideoBlock from "./VideoBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faWrench } from "@fortawesome/pro-regular-svg-icons";
function TwoColumnsBlock({
  block,
  blocks,                // the full array of blocks
  addBlock,              // function to add a new top-level block
  addSubBlockToColumn,   // function to insert a sub-block in one column
  updateSubBlockContent, // function to update a sub-block's content
  setTooltipIndex,       // to open your block-adding tooltip
  idCounterRef,          // if you need it in here, or handle in addSubBlockToColumn
  setBlocks,
  updateRadioTitle,
  updateRadioOption,
  removeRadioOption,
  updateInputTitle,
  updateLargeInputTitle,
  updateBlockContent,
  handleBlockClick,
  blockRefs

}) {
  if (!block) return null;

  // We can find this block's index to place a block beneath it
  const blockIndex = blocks.findIndex((b) => b.id === block.id);

  return (
    <div className="group relative  ">
      <div className="flex gap-4">
        {/* Column 1 */}
        <div
          className="
          relative group w-1/2 min-h-[80px]
          transition-all duration-200 ease-in-out
          hover:bg-blue-50
        "

        >
          {block.column1.length === 0 ? (
            // If column1 is empty, show a hoverable + button
            <div
              className="
              flex justify-center items-center h-full
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // e.g. open your tooltip or call addBlockToColumn(block.id, "column1", "text")
                  setTooltipIndex({ parentId: block.id, column: "column1" });
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
              >
                +
              </button>
            </div>
          ) : (
            // If column1 has sub-block IDs, render them
            block.column1.map((subBlockId) => {
              // 1) Find the sub-block in the main blocks array
              const subBlock = blocks.find((b) => b.id === subBlockId);
              if (!subBlock) return null; // safety check
              console.log(subBlock);

              // 2) Render each subBlock by type
              return (
                <div key={subBlock.id} ref={(el) => (blockRefs.current[subBlock.id] = el)}>
                  {/* TEXT Block */}
                  {subBlock.type === "text" && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none"
                      style={{
                        textAlign: subBlock.alignment,
                        color: subBlock.color,
                        textDecoration: subBlock.isUnderlined ? "underline" : "none",
                        fontWeight: subBlock.isBold ? "bold" : "normal",
                        fontStyle: subBlock.isItalic ? "italic" : "normal",
                        fontFamily: subBlock.fontFamily,
                        fontSize: subBlock.fontSize,
                      }}
                      onBlur={(e) =>
                        updateBlockContent(subBlock.id, e.target.innerText)
                      }
                    >
                      {subBlock.content || "Enter text..."}
                    </div>
                  )}

                  {/* HEADER Block */}
                  {subBlock.type === "header" && (() => {
                    const TagName = subBlock.level || "h2";

                    const headingSizeClass = (() => {
                      if (!subBlock.level) return "text-2xl";
                      switch (subBlock.level) {
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
                        className={`font-bold ${headingSizeClass} outline-none`}
                        style={{
                          textAlign: subBlock.alignment,
                          color: subBlock.color,
                          textDecoration: subBlock.isUnderlined ? "underline" : "none",
                          fontWeight: subBlock.isBold ? "bold" : "normal",
                          fontStyle: subBlock.isItalic ? "italic" : "normal",
                          fontFamily: subBlock.fontFamily,
                        }}
                        onBlur={(e) => updateBlockContent(subBlock.id, e.target.textContent)}
                      >
                        {subBlock.content || "Heading"}
                      </TagName>
                    );
                  })()}

                  {/* IMAGE Block */}
                  {subBlock.type === "image" && (
                    <div className="flex items-center justify-center">
                      {subBlock.content ? (
                        <img
                          src={subBlock.content}
                          alt=""
                          style={{
                            width: subBlock.width || "50%",
                            borderRadius: subBlock.borderRadius || "0",
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  )}

                  {/* VIDEO Block */}
                  {subBlock.type === "video" && (
                    <div className="flex items-center justify-center">
                      {subBlock.content ? (
                        <VideoBlock block={subBlock} />
                      ) : (
                        <div className="text-gray-500">No video selected</div>
                      )}
                    </div>
                  )}

                  {/* BUTTON Block */}
                  {subBlock.type === "button" && (
                    <div style={{ textAlign: subBlock.alignment || "left" }}>
                      <button
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateBlockContent(subBlock.id, e.target.innerText)}
                        className="px-4 py-2 rounded"
                        style={{
                          backgroundColor: subBlock.backgroundColor || "#2563eb",
                          color: subBlock.color || "white",
                          borderRadius: subBlock.borderRadius || "8px",
                          fontSize: subBlock.fontSize || "16px",
                        }}
                      >
                        {subBlock.content || "Button"}
                      </button>
                    </div>
                  )}

                  {/* RADIO Block */}
                  {subBlock.type === "radio" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      {/* Editable Title */}
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-4 text-lg font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                          fontFamily: subBlock.fontFamily || "inherit",
                          color: subBlock.color || "#000000",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateRadioTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Untitled Question"}
                      </div>

                      {/* Radio Options */}
                      {subBlock.content?.map((option, i) => (
                        <div
                          key={i}
                          className={`group relative flex items-center mb-2 ${subBlock.alignment === "right" ? "flex-row-reverse" : ""
                            }`}
                          style={{
                            justifyContent:
                              subBlock.alignment === "center"
                                ? "center"
                                : subBlock.alignment === "right"
                                  ? "flex-end"
                                  : "flex-start",
                          }}
                        >
                          <input
                            type="radio"
                            name={`radio-${subBlock.id}`}
                            className="mr-2"
                          />

                          <span
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
                                updateRadioOption(subBlock.id, i, newText);
                              }
                            }}
                            className="p-1 rounded w-full outline-none"
                            style={{
                              color: subBlock.color || "#000000",
                              fontFamily: subBlock.fontFamily || "inherit",
                              textAlign: subBlock.alignment || "left",
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => removeRadioOption(subBlock.id, i)}
                            className={`absolute ${subBlock.alignment === "right" ? "left-0 ml-2" : "right-0 mr-2"
                              } opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 z-10`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SMALL INPUT Block */}
                  {subBlock.type === "smallinput" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      {/* Editable Title for the input label */}
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-2 text-base font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateInputTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Enter Label..."}
                      </div>

                      <input
                        type="text"
                        
                        style={{
                          textAlign: subBlock.alignment || "left",
                          color: subBlock.color || "#000000",
                          fontFamily: subBlock.fontFamily || "inherit",
                        }}
                        className="border rounded px-2 py-2 w-full focus:outline-none"
                      />
                    </div>
                  )}

                  {/* LARGE INPUT Block */}
                  {subBlock.type === "largeinput" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-2 text-base font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateLargeInputTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Enter Label..."}
                      </div>

                      <textarea
                        
                        style={{
                          textAlign: subBlock.alignment || "left",
                          color: subBlock.color || "#000000",
                          fontFamily: subBlock.fontFamily || "inherit",
                        }}
                        className="border rounded p-2 w-full h-32 resize-none focus:outline-none"
                      />
                    </div>
                  )}
                  {/* Gear Icon (hidden by default, appears on hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockClick(subBlock.id);
                    }}
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-800
                                 opacity-0 group-hover:opacity-100
                                 bg-transparent border-none shadow-none p-0 cursor-pointer
                                 transition-opacity duration-200"
                  >
                    <FontAwesomeIcon icon={faWrench} />
                  </button>

                  {/* Close Settings */}
                </div>
              );
            })
          )}
        </div>


        {/* Column 2 */}
        <div
          className="
            relative group w-1/2  min-h-[80px]
            transition-all duration-200 ease-in-out
            hover:bg-blue-50
          "
        >
          {block.column2.length === 0 ? (
            // If column2 is empty, show a hoverable + button
            <div
              className="
              flex justify-center items-center h-full
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Example: open your tooltip, or call addBlockToColumn(...)
                  setTooltipIndex({ parentId: block.id, column: "column2" });
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
              >
                +
              </button>
            </div>
          ) : (
            // If column2 has sub-block IDs, render them
            block.column2.map((subBlockId) => {
              // 1) Find the sub-block in the main blocks array
              const subBlock = blocks.find((b) => b.id === subBlockId);
              if (!subBlock) return null;

              // 2) Render by subBlock.type
              return (
                <div key={subBlock.id} ref={(el) => (blockRefs.current[subBlock.id] = el)} >
                  {/* TEXT Block */}
                  {subBlock.type === "text" && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none"
                      style={{
                        textAlign: subBlock.alignment,
                        color: subBlock.color,
                        textDecoration: subBlock.isUnderlined ? "underline" : "none",
                        fontWeight: subBlock.isBold ? "bold" : "normal",
                        fontStyle: subBlock.isItalic ? "italic" : "normal",
                        fontFamily: subBlock.fontFamily,
                        fontSize: subBlock.fontSize,
                      }}
                      onBlur={(e) => updateBlockContent(subBlock.id, e.target.innerText)}
                    >
                      {subBlock.content || "Enter text..."}
                    </div>
                  )}

                  {/* HEADER Block */}
                  {subBlock.type === "header" && (() => {
                    const TagName = subBlock.level || "h2";

                    const headingSizeClass = (() => {
                      if (!subBlock.level) return "text-2xl";
                      switch (subBlock.level) {
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
                        className={`font-bold ${headingSizeClass} outline-none`}
                        style={{
                          textAlign: subBlock.alignment,
                          color: subBlock.color,
                          textDecoration: subBlock.isUnderlined ? "underline" : "none",
                          fontWeight: subBlock.isBold ? "bold" : "normal",
                          fontStyle: subBlock.isItalic ? "italic" : "normal",
                          fontFamily: subBlock.fontFamily,
                        }}
                        onBlur={(e) => updateBlockContent(subBlock.id, e.target.textContent)}
                      >
                        {subBlock.content || "Heading"}
                      </TagName>
                    );
                  })()}

                  {/* IMAGE Block */}
                  {subBlock.type === "image" && (
                    <div className="flex items-center justify-center">
                      {subBlock.content ? (
                        <img
                          src={subBlock.content}
                          alt=""
                          style={{
                            width: subBlock.width || "50%",
                            borderRadius: subBlock.borderRadius || "0",
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="text-gray-500">No image selected</div>
                      )}
                    </div>
                  )}

                  {/* VIDEO Block */}
                  {subBlock.type === "video" && (
                    <div className="flex items-center justify-center">
                      {subBlock.content ? (
                        <VideoBlock block={subBlock} />
                      ) : (
                        <div className="text-gray-500">No video selected</div>
                      )}
                    </div>
                  )}

                  {/* BUTTON Block */}
                  {subBlock.type === "button" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          subBlock.alignment === "right"
                            ? "flex-end"
                            : subBlock.alignment === "center"
                              ? "center"
                              : "flex-start",
                       
                      }}
                    >
                      <button
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => updateBlockContent(subBlock.id, e.target.innerText)}
                        className="px-4 py-2 rounded"
                        style={{
                          backgroundColor: subBlock.backgroundColor || "#2563eb",
                          color: subBlock.color || "white",
                          borderRadius: subBlock.borderRadius || "8px",
                          fontSize: subBlock.fontSize || "16px",
                        }}
                      >
                        {subBlock.content || "Button"}
                      </button>
                    </div>
                  )}


                  {/* RADIO Block */}
                  {subBlock.type === "radio" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      {/* Editable Title */}
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-4 text-lg font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                          fontFamily: subBlock.fontFamily || "inherit",
                          color: subBlock.color || "#000000",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateRadioTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Untitled Question"}
                      </div>

                      {/* Radio Options */}
                      {subBlock.content?.map((option, i) => (
                        <div
                          key={i}
                          className={`group relative flex items-center mb-2 ${subBlock.alignment === "right" ? "flex-row-reverse" : ""
                            }`}
                          style={{
                            justifyContent:
                              subBlock.alignment === "center"
                                ? "center"
                                : subBlock.alignment === "right"
                                  ? "flex-end"
                                  : "flex-start",
                          }}
                        >
                          <input
                            type="radio"
                            name={`radio-${subBlock.id}`}
                            className="mr-2"
                          />

                          <span
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
                                updateRadioOption(subBlock.id, i, newText);
                              }
                            }}
                            className="p-1 rounded w-full outline-none"
                            style={{
                              color: subBlock.color || "#000000",
                              fontFamily: subBlock.fontFamily || "inherit",
                              textAlign: subBlock.alignment || "left",
                            }}
                          />

                          <button
                            type="button"
                            onClick={() => removeRadioOption(subBlock.id, i)}
                            className={`absolute ${subBlock.alignment === "right" ? "left-0 ml-2" : "right-0 mr-2"
                              } opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 z-10`}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SMALL INPUT Block */}
                  {subBlock.type === "smallinput" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-2 text-base font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateInputTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Enter Label..."}
                      </div>

                      <input
                        type="text"
                        
                        style={{
                          textAlign: subBlock.alignment || "left",
                          color: subBlock.color || "#000000",
                          fontFamily: subBlock.fontFamily || "inherit",
                        }}
                        className="border rounded px-2 py-2 w-full focus:outline-none"
                      />
                    </div>
                  )}

                  {/* LARGE INPUT Block */}
                  {subBlock.type === "largeinput" && (
                    <div
                      className="p-2"
                      style={{
                        textAlign: subBlock.alignment || "left",
                        color: subBlock.color || "#000000",
                        fontFamily: subBlock.fontFamily || "inherit",
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        className="mb-2 text-base font-semibold outline-none"
                        style={{
                          textAlign: subBlock.alignment || "left",
                        }}
                        onBlur={(e) => {
                          const newTitle = e.currentTarget.textContent.trim();
                          updateLargeInputTitle(subBlock.id, newTitle);
                        }}
                      >
                        {subBlock.title || "Enter Label..."}
                      </div>

                      <textarea
                        
                        style={{
                          textAlign: subBlock.alignment || "left",
                          color: subBlock.color || "#000000",
                          fontFamily: subBlock.fontFamily || "inherit",
                        }}
                        className="border rounded p-2 w-full h-32 resize-none focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Gear Icon (hidden by default, appears on hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockClick(subBlock.id);
                    }}
                    className="absolute top-1 right-1 text-gray-500 hover:text-gray-800
                                 opacity-0 group-hover:opacity-100
                                 bg-transparent border-none shadow-none p-0 cursor-pointer
                                 transition-opacity duration-200"
                  >
                    <FontAwesomeIcon icon={faWrench} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}

export default TwoColumnsBlock;
