import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/pro-light-svg-icons';


export default function Guidepreview({ navigateTo }) {
    const [showTooltip, setShowTooltip] = React.useState(false);

    return (
        <div className="flex flex-col w-full h-full p-8 text-white ">
            <div className="flex flex-row w-full justify-between items-center mb-6">
                <p className="text-xl font-semibold">Guide Preview</p>
                <div className="relative flex space-x-4">
                    <button
                         onClick={() => setShowTooltip(!showTooltip)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        + Step
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                    {showTooltip && (
                        <div className="absolute left-[-10px] mt-12 bg-white text-black p-6 rounded shadow-lg z-10 w-40">
                            <div className="flex items-center mb-2 hover:bg-gray-100 p-2 rounded transition">
                                <img src="/modal.png" alt="Modal" className="w-8 h-8 mr-2" />
                                <span>Modal</span>
                            </div>
                            <div className="flex items-center hover:bg-gray-100 p-2 rounded transition">
                                <img src="/tooltip.png" alt="Tooltip" className="w-8 h-8 mr-2" />
                                <span>Tooltip</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center justify-start h-full">
                <img src="/webbuilder.png" alt="Web Builder" className="w-3/4 mb-6 opacity-65" />
                <p className="text-center text-gray-400">No steps created yet. Add a step to get started.</p>
            </div>
        </div>
    );
}