import React, { useState } from "react";
import ViewGuides from "./components/Viewguides";
import CreateGuide from "./components/Createguide";
import GuidePreview from "./components/Guidepreview";
import ModalsSection from "./components/Modalssection";

const App = () => {
  const [history, setHistory] = useState(["view-guides"]); // Tracks visited sections

  const navigateTo = (page) => {
    setHistory([...history, page]); // Push new page to history
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1)); // Remove last page
    }
  };

  // Get the current section
  const currentPage = history[history.length - 1];

  return (
    <div className="flex flex-col h-screen w-[400px] bg-[#1E3A8A]">
      <div className="flex items-center justify-between text-lg h-[70px] mx-auto p-4 text-white w-full text-center bg-blue-100">
        <button onClick={goBack} className="text-[#1E3A8A]">Back</button>
        <div className="flex items-center mx-auto">
          <img src="/partylogo.png" alt="Party Logo" className="h-8 w-8 mr-2" />
          <span className="text-[#1E3A8A]">Boarding Party</span>
        </div>
        <div className="w-12"></div> {/* Placeholder to balance the flex layout */}
      </div>
      {/* Render Components Based on Page */}
      {currentPage === "view-guides" && <ViewGuides navigateTo={navigateTo} />}
      {currentPage === "create-guide" && <CreateGuide navigateTo={navigateTo} />}
      {currentPage === "guide-preview" && <GuidePreview navigateTo={navigateTo} />}
      {currentPage === "modal-section" && <ModalsSection navigateTo={navigateTo} />}

    </div>
  );
};

export default App;
