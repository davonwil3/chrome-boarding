import React, { useEffect, useState } from "react";

const TooltipSection = ({ setCurrentPage, setTooltipSelector }) => {
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "ELEMENT_SELECTED") {
        setTooltipSelector(event.data.selector);
        setSelecting(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const startPickMode = () => {
    setSelecting(true);
    window.parent.postMessage({ type: "START_PICK_MODE" }, "*");
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-lg font-bold mb-4">Tooltip Settings</h2>
      <button
        onClick={startPickMode}
        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
      >
        {selecting ? "Click on an element..." : "Select Element on Page"}
      </button>
    </div>
  );
};

export default TooltipSection;
