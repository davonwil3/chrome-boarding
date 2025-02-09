import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/pro-light-svg-icons';


export default function Guidepreview({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full px-8 text-white ">
            <div className="flex flex-row w-full justify-between px-8 items-end">
                <p>Guide Preview</p>
                <button
                    onClick={() => navigateTo("create-guide")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    + Step
                </button>
                <button
                    onClick={() => navigateTo("create-guide")}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>
        </div>
    );
}