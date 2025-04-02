import React, { useState } from "react";
import ViewGuides from "./components/Viewguides";
import CreateGuide from "./components/Createguide";
import GuidePreview from "./components/Guidepreview";
import ModalsSection from "./components/Modalssection";
import ModalSidebar from "./components/ModalSidebar";

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

  const [showModal, setShowModal] = useState(false);

  // Modal width state
  const [modalWidth, setModalWidth] = useState(600);
  const [modalBgColor, setModalBgColor] = useState("#ffffff");
  const [skippable, setSkippable] = useState(false); // State for skippable step toggle
  const [modalPosition, setModalPosition] = useState("center");
  const [cornerRoundness, setCornerRoundness] = useState(8);
  const [showBackDrop, setShowBackDrop] = useState(true);
  // State for border style
  const [borderStyle, setBorderStyle] = useState('solid');
  // State for border color
  const [borderColor, setBorderColor] = useState('#000000');
  // State for border width
  const [borderWidth, setBorderWidth] = useState(1); // Default border width
  const [showBorderSettings, setShowBorderSettings] = useState(false);
  const [nextButton, setNextButton] = useState(false); 

  // Get the current section
  const currentPage = history[history.length - 1];

  return (
    <div>
      <div className="flex flex-col h-screen w-[350px] bg-[#1E3A8A] fixed z-[9999] overflow-y-auto overflow-x-hidden ">
        <div className="flex items-center justify-between text-lg h-[70px] mx-auto p-4 text-white w-full text-center bg-blue-100">
          <button onClick={() => { goBack(); if (currentPage === 'modal-section') setShowModal(false); }} className="text-[#1E3A8A]">Back</button>
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
        {currentPage === "modal-section" &&
          <ModalSidebar navigateTo={navigateTo}
            setModalWidth={setModalWidth}
            modalWidth={modalWidth}
            setShowModal={setShowModal}
            modalBgColor={modalBgColor}
            setModalBgColor={setModalBgColor}
            skippable={skippable}
            setSkippable={setSkippable}
            setModalPosition={setModalPosition}
            cornerRoundness={cornerRoundness}
            setCornerRoundness={setCornerRoundness}
            modalPosition={modalPosition}
            showBackDrop={showBackDrop}
            setShowBackDrop={setShowBackDrop}
            borderColor={borderColor} 
            setBorderColor={setBorderColor} 
            borderStyle={borderStyle}
            setBorderStyle={setBorderStyle}
            borderWidth={borderWidth}
            setBorderWidth={setBorderWidth}
            showBorderSettings={showBorderSettings}
            setShowBorderSettings={setShowBorderSettings}
            nextButton={nextButton}
            setNextButton={setNextButton}

          />}

      </div>

      {/* Render Modals */}
      {showModal &&
        <ModalsSection
          navigateTo={navigateTo}
          modalWidth={modalWidth}
          setShowModal={setShowModal}
          modalBgColor={modalBgColor}
          skippable={skippable}
          modalPosition={modalPosition}
          cornerRoundness={cornerRoundness}
          showBackDrop={showBackDrop}
          borderStyle={borderStyle} 
          borderWidth={borderWidth} 
          borderColor={borderColor}
          showBorderSettings={showBorderSettings} 
          nextButton={nextButton} 
        />}

    </div>
  );
};

export default App;
