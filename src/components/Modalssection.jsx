import React, { useEffect, useState } from "react";

export default function ModalsSection({ navigateTo }) {
  const [isDevMode, setIsDevMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // Track modal state in React (dev mode)

  useEffect(() => {
    // Detect if we're in React Dev Mode (localhost)
    if (window.location.hostname === "localhost") {
      setIsDevMode(true);
    }
  }, []);

  const createModal = () => {
    if (isDevMode) {
      // Show modal inside React during development
      setShowModal(true);
    } else {
      // Inject the modal into the main webpage when running in a Chrome extension
      let existingModal = window.parent.document.getElementById("boarding-modal");

      if (existingModal) {
        existingModal.remove(); // Remove modal if it already exists
      } else {
        const modal = window.parent.document.createElement("div");
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
        modalContent.innerHTML = `
          <h2 style="color: #1E3A8A;">Custom Modal</h2>
          <p style="color: gray;">This modal is injected into the main webpage.</p>
          <button id="closeModal" style="margin-top: 10px; padding: 10px; background: #1E3A8A; color: white; border: none; cursor: pointer; border-radius: 5px;">
            Close
          </button>
        `;

        modal.appendChild(modalContent);
        window.parent.document.body.appendChild(modal);

        window.parent.document.getElementById("closeModal").addEventListener("click", () => {
          modal.remove();
        });
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-white">Modals Section</h2>
      <button 
        onClick={createModal} 
        className="mt-4 bg-white text-[#1E3A8A] px-4 py-2 rounded-lg">
        Open Modal
      </button>

      {/* Show Modal Inside React for Development Mode */}
      {isDevMode && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-800">Preview Mode: Custom Modal</h2>
            <p className="text-gray-600 mt-2">This modal is inside React (development mode).</p>
            <button 
              onClick={() => setShowModal(false)} 
              className="mt-4 bg-[#1E3A8A] text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

