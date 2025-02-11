import React, { useState } from "react";
import ViewGuides from "./components/Viewguides";
import CreateGuide from "./components/Createguide";
import GuidePreview from "./components/Guidepreview";



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
    <div className="flex flex-col fixed top-0 left-0 h-screen w-[400px] min-h-[815px] bg-[#323B4F]">
      <div className="text-lg h-[70px] mx-auto p-4 text-white w-full text-center bg-gray-500 ">Boarding Party</div>
      
      {/* Render Components Based on Page */}
      {currentPage === "view-guides" && <ViewGuides navigateTo={navigateTo} />}
      {currentPage === "create-guide" && <CreateGuide navigateTo={navigateTo} />}
      {currentPage === "guide-preview" && <GuidePreview navigateTo={navigateTo} />}

   
    </div>
  );
};

export default App;
