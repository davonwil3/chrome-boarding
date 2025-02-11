import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/pro-light-svg-icons';


export default function Guidepreview({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full p-8 text-white ">
            <div className="flex flex-row w-full justify-between items-center mb-6">
                <p className="text-xl font-semibold">Guide Preview</p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigateTo("create-guide")}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        + Step
                    </button>
                    <button
                        onClick={() => navigateTo("create-guide")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-start h-full">
                <img src="/webbuilder.png" alt="Web Builder" className="w-3/4 mb-6 opacity-85" />
                <p className="text-center text-gray-400">No steps created yet. Add a step to get started.</p>
            </div>
        </div>
    );
}