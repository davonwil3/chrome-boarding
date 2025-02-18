import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

export default function ModalsSection({ navigateTo }) {
  const editorRef = useRef(null);
  const [isDevMode, setIsDevMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // Track modal state in React (dev mode) env

  useEffect(() => {
    // Detect development mode
    if (window.location.hostname === "localhost") {
      setIsDevMode(true);
    }

    // Initialize Editor.js inside the sidebar if not already initialized
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "https://your-image-upload-api.com/upload",
              },
            },
          },
        },
      });
    }
  }, []);

  const createCustomModal = async () => {
    const editor = editorRef.current;
    const output = await editor.save();

    let modal = window.parent.document.getElementById("boarding-modal");
    if (modal) modal.remove();

    modal = window.parent.document.createElement("div");
    modal.id = "boarding-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.backgroundColor = "rgba(0,0,0,0.5)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";

    const modalContent = window.parent.document.createElement("div");
    modalContent.style.width = "400px";
    modalContent.style.padding = "20px";
    modalContent.style.backgroundColor = "white";
    modalContent.style.borderRadius = "10px";
    modalContent.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";

    // Render user-created blocks inside the modal
    output.blocks.forEach((block) => {
      let el;
      if (block.type === "paragraph") {
        el = document.createElement("p");
        el.innerText = block.data.text;
      } else if (block.type === "header") {
        el = document.createElement(`h${block.data.level}`);
        el.innerText = block.data.text;
      } else if (block.type === "list") {
        el = document.createElement(block.data.style === "unordered" ? "ul" : "ol");
        block.data.items.forEach((item) => {
          const li = document.createElement("li");
          li.innerText = item;
          el.appendChild(li);
        });
      } else if (block.type === "image") {
        el = document.createElement("img");
        el.src = block.data.file.url;
        el.style.maxWidth = "100%";
      }
      if (el) {
        modalContent.appendChild(el);
      }
    });

    // Close button
    const closeButton = window.parent.document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.marginTop = "10px";
    closeButton.style.padding = "10px";
    closeButton.style.backgroundColor = "#1E3A8A";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "5px";
    closeButton.onclick = () => modal.remove();
    
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    window.parent.document.body.appendChild(modal);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-white">Custom Modal Builder</h2>
      <div id="editorjs" className="bg-gray-100 p-4 rounded-md"></div>

      <button
        onClick={createCustomModal}
        className="mt-4 bg-white text-[#1E3A8A] px-4 py-2 rounded-lg"
      >
        Inject Custom Modal
      </button>

      {/* Show Modal Inside React for Development Mode */}
      {isDevMode && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Preview Mode: Custom Modal
            </h2>
            <p className="text-gray-600 mt-2">
              This modal is inside React (development mode).
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-[#1E3A8A] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


