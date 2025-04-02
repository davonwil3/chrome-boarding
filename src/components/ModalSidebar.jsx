import React, { use } from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/pro-regular-svg-icons";
import { HexColorPicker } from "react-colorful";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from 'react-select';


const ModalSidebar = ({ setModalWidth, setShowModal, modalWidth, modalBgColor, setModalBgColor, skippable, setSkippable, setModalPosition }) => {

    // State for background color picker visibility
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    // Ref for the background color picker to handle outside clicks
    const bgPickerRef = useRef(null);

    

    // Handle outside click to close the background color picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bgPickerRef.current && !bgPickerRef.current.contains(event.target)) {
                setShowBgColorPicker(false);
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
                            color="primary"
                        />
                    }
                    label={<span className="text-white font-semibold">Skippable Step</span>}
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
                    defaultValue={{ value: 'center', label: 'Center' }}
                    onChange={(option) => {
                        // Set the modal position based on the selected option
                        setModalPosition(option.value);
                    }}
                    classNamePrefix="react-select"
                />
            </div>



        </div>
    )

}

export default ModalSidebar;