import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { BulletList, OrderedList } from "@tiptap/extension-list";

import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";


export default function TiptapBlockEditor() {
  const [showModal, setShowModal] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      BulletList,
      OrderedList,
      Image.configure(),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    
    content: "<p>Start editing...</p>",
  });

  const addBlock = (type) => {
    if (!editor) return;

    switch (type) {
      case "heading":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "paragraph":
        editor.chain().focus().insertContent("<p>New paragraph...</p>").run();
        break;
      case "list":
        editor.chain().focus().toggleBulletList().run();
        break;
      case "image":
        const url = prompt("Enter image URL:");
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        break;
      case "button":
        editor.chain().focus().insertContent('<button class="bg-blue-500 text-white px-4 py-2 rounded">Click Me</button>').run();
        break;
      default:
        break;
    }
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
        
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Block Picker (Like Userpilot) */}
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => addBlock("heading")}
                className="bg-gray-200 px-3 py-2 rounded text-sm"
              >
                ➕ Header
              </button>
              <button
                onClick={() => addBlock("paragraph")}
                className="bg-gray-200 px-3 py-2 rounded text-sm"
              >
                ➕ Paragraph
              </button>
              <button
                onClick={() => addBlock("list")}
                className="bg-gray-200 px-3 py-2 rounded text-sm"
              >
                ➕ List
              </button>
              <button
                onClick={() => addBlock("image")}
                className="bg-gray-200 px-3 py-2 rounded text-sm"
              >
                🖼 Image
              </button>
              <button
                onClick={() => addBlock("button")}
                className="bg-gray-200 px-3 py-2 rounded text-sm"
              >
                🔘 Button
              </button>
            </div>

            {/* Editor Content */}
            <div className="border p-4 rounded bg-gray-100">
              <EditorContent editor={editor} />
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
