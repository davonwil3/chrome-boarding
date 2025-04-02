import React, { use } from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/pro-regular-svg-icons";
import { HexColorPicker } from "react-colorful";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';


const ModalSidebar = ({ setModalWidth,
    setShowModal,
    modalWidth,
    modalBgColor,
    setModalBgColor,
    skippable,
    setSkippable,
    setModalPosition,
    cornerRoundness,
    setCornerRoundness,
    modalPosition,
    showBackDrop,
    setShowBackDrop,
    borderStyle,
    setBorderStyle,
    borderColor,
    setBorderColor,
    borderWidth,
    setBorderWidth,
    showBorderSettings,
    setShowBorderSettings,
    nextButton,
    setNextButton


}) => {

    // State for background color picker visibility
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    // Ref for the background color picker to handle outside clicks
    const bgPickerRef = useRef(null);
    // State for border color picker visibility
    const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
    // Ref for the border color picker to handle outside clicks
    const borderColorPickerRef = useRef(null);
    // State for border settings





    // Handle outside click to close the background color picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgPickerRef.current && !bgPickerRef.current.contains(event.target)) {
                setShowBgColorPicker(false);
            }
            if (borderColorPickerRef.current && !borderColorPickerRef.current.contains(event.target)) {
                setShowBorderColorPicker(false);
            }
        };

        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [bgPickerRef]);

    // show modal when sidebar is opened 
    useEffect(() => {
        setShowModal(true);
    }
        , [])


    return (
        <div className="p-4">

            {/* --- Slider for modal width --- */}
            <div className="w-full  mt-4">
                <label htmlFor="modalWidth" className="block mb-1 text-md text-white">
                    Width: <span className="font-semibold">{modalWidth}px</span>
                </label>
                <input
                    id="modalWidth"
                    type="range"
                    min="300"
                    max="1000"
                    step="10"
                    value={modalWidth}
                    onChange={(e) => setModalWidth(e.target.value)}
                    className="w-full accent-red-200 cursor-pointer"
                />
            </div>

            {/* Modal Background Color Picker */}
            <div className="relative mt-4">
                <button
                    onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                    className=" py-1 flex items-center space-x-3  "
                >
                    <div
                        style={{
                            backgroundColor: modalBgColor || "#ffffff",
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    ></div>
                    <span className="text-white font-semibold ml-4">Modal Background</span>
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: "white" }} />
                </button>

                {showBgColorPicker && (
                    <div
                        className="absolute z-20 mt-2"
                        ref={bgPickerRef}
                        style={{ left: "63%", top: "0" }}
                    >
                        <HexColorPicker
                            color={modalBgColor}
                            onChange={setModalBgColor}
                        />
                    </div>
                )}
            </div>

            {/* Skippable Step Toggle */}
            <div className="mt-6">
                <FormControlLabel
                    control={
                        <Switch
                            checked={skippable}
                            onChange={(e) => setSkippable(e.target.checked)}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#fecaca", // Thumb color when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#fecaca", // Track color when checked
                                },
                            }}
                        />
                    }
                    label={<span className="text-white font-semibold">Skippable Step</span>}
                />
            </div>

            {/* toggle for next button */}
            <div className="mt-6">
                <FormControlLabel
                    control={
                        <Switch
                            checked={nextButton} 
                            onChange={(e) => setNextButton(e.target.checked)} 
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#fecaca", // Thumb color when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#fecaca", // Track color when checked
                                },
                            }}
                        />
                    }
                    label={<span className="text-white font-semibold"> Next button</span>}
                />
            </div>

            {/* dropdown for modal position */}
            <div className="mt-6">
                <label htmlFor="modalPosition" className="block mb-1 text-md text-white font-semibold">
                    Modal Position:
                </label>
                <Select
                    id="modalPosition"
                    options={[
                        { value: 'top', label: 'Top' },
                        { value: 'center', label: 'Center' },
                        { value: 'bottom', label: 'Bottom' }
                    ]}
                    defaultValue={{ value: modalPosition || 'center', label: modalPosition ? modalPosition.charAt(0).toUpperCase() + modalPosition.slice(1) : 'Center' }}
                    onChange={(option) => {
                        // Set the modal position based on the selected option
                        setModalPosition(option.value);
                    }}
                    classNamePrefix="react-select"
                />
            </div>

            {/* Slider for corner roundness */}
            <div className="w-full mt-4">
                <label htmlFor="cornerRoundness" className="block mb-1 text-md text-white">
                    Corner Roundness: <span className="font-semibold"> {cornerRoundness} </span>
                </label>
                <input
                    id="cornerRoundness"
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={cornerRoundness}
                    onChange={(e) => setCornerRoundness(e.target.value)}
                    className="w-full accent-red-200 cursor-pointer"
                />

            </div>

            {/* toggle to show backdrop */}

            <div className="mt-6">
                <FormControlLabel
                    control={
                        <Switch
                            checked={showBackDrop}
                            onChange={(e) => setShowBackDrop(e.target.checked)}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#fecaca", // Thumb color when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#fecaca", // Track color when checked
                                },
                            }}
                        />
                    }
                    label={<span className="text-white font-semibold">Show Backdrop</span>}
                />
            </div>

            {/* --- Modal Border Toggle --- */}
            <div className="mt-6">
                <FormControlLabel
                    control={
                        <Switch
                            checked={showBorderSettings}
                            onChange={(e) => setShowBorderSettings(e.target.checked)}
                            sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                    color: "#fecaca", // Thumb color when checked
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                    backgroundColor: "#fecaca", // Track color when checked
                                },
                            }}
                        />
                    }
                    label={<span className="text-white font-semibold">Modal Border</span>}
                />
            </div>

            {/* --- Border Settings --- */}
            {showBorderSettings && (
                <div className="mt-4 space-y-4">
                    {/* Border Style Dropdown */}
                    <div>
                        <label className="block text-white mb-1 font-medium">Border Style</label>
                        <Select
                            options={[
                                { value: 'solid', label: 'Solid' },
                                { value: 'dashed', label: 'Dashed' },
                                { value: 'dotted', label: 'Dotted' },
                                { value: 'double', label: 'Double' },
                            ]}
                            defaultValue={{ value: borderStyle || 'solid', label: borderStyle ? borderStyle.charAt(0).toUpperCase() + borderStyle.slice(1) : 'Solid' }}
                            onChange={(option) => {
                                setBorderStyle(option.value);
                            }}
                            classNamePrefix="react-select"
                        />
                    </div>

                    {/* Border Color Picker */}
                    <div>
                        <label className="block text-white mb-1 font-medium">Border Color</label>
                        <button
                            onClick={() => setShowBorderColorPicker(!showBorderColorPicker)}
                            className="py-1 flex items-center space-x-3"
                        >
                            <div
                                style={{
                                    backgroundColor: borderColor || "#000000",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            ></div>
                            <span className="text-white font-semibold ml-4">Select Color</span>
                            <FontAwesomeIcon icon={faCaretDown} style={{ color: "white" }} />
                        </button>

                        {showBorderColorPicker && (
                            <div
                                className="absolute z-20 mt-2"
                                ref={borderColorPickerRef}
                                style={{ left: "63%", top: "0" }}
                            >
                                <HexColorPicker
                                    color={borderColor}
                                    onChange={setBorderColor}
                                />
                            </div>
                        )}
                    </div>

                    {/* Border Width Slider */}
                    <div>
                        <label className="block text-white mb-1 font-medium">
                            Border Width: <span className="font-semibold">{borderWidth}px</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={borderWidth}
                            onChange={(e) => setBorderWidth(Number(e.target.value))}
                            className="w-full accent-red-200 cursor-pointer"
                        />
                    </div>
                </div>
            )}




        </div>
    )

}

export default ModalSidebar;