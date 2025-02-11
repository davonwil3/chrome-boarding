import React from "react";

export default function ViewGuides({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full pt-8">
            <div className="flex flex-row w-full justify-between px-8 items-end">
                <p className="text-2xl font-bold text-white">Guides</p>
                <button
                    onClick={() => navigateTo("create-guide")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create Guide
                </button>
            </div>
            <div className="w-full border-b border-gray-300 my-4 mt-8"></div>
        </div>
    );
}