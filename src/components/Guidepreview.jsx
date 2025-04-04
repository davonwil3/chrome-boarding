import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/pro-light-svg-icons';
import { useState } from "react";

export default function Guidepreview({ navigateTo }) {
    const [stepsCreated, setStepsCreated] = useState(false);
    return (
        <div className="flex flex-col w-full h-full p-8 text-white ">
            <div className="flex flex-row w-full justify-between items-center mb-6">
                <p className="text-xl font-semibold">Guide Preview</p>
                <div className="relative flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={() => setStepsCreated(true)}
                    >
                        + Step
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start h-full">
                {stepsCreated ? (
                    <div className="flex flex-col items-start space-y-4 w-full">
                        <div className="flex items-center w-full bg-blue-700 p-4 rounded-lg  transition hover:bg-blue-800" onClick={() => navigateTo("modal-section")}>
                            <img src="/modal.png" alt="Modal" className="w-10 h-10 mr-4" />
                            <span className="text-lg font-medium">Modal</span>
                        </div>
                        <div className="flex items-center w-full bg-blue-700 p-4 rounded-lg  transition hover:bg-blue-800"
                            onClick={() => navigateTo("tooltip-section") /* Placeholder for tooltip navigation */}
                        >
                            <img src="/tooltip.png" alt="Tooltip" className="w-10 h-10 mr-4" />
                            <span className="text-lg font-medium">Tooltip</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <img src="/webbuilder.png" alt="Web Builder" className="w-3/4 mb-6 opacity-65" />
                        <p className="text-center text-gray-400">No steps created yet. Add a step to get started.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
