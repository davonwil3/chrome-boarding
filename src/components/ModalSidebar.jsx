import React, { use } from "react";
import { useState, useEffect} from "react";

const ModalSidebar = ({setModalWidth, setShowModal, modalWidth}) => {

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
        </div>
    )

}

export default ModalSidebar;