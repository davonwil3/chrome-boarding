import React from "react";

export default function CreateGuide({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full px-8 text-white pt-8">
            <p className="text-2xl font-bold mb-4">Create a guide</p>
            <input
                type="text"
                placeholder="Guide Name"
                className="mt-2 p-2 border rounded"
            />
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200"
                onClick={() => navigateTo("guide-preview")}
            >
                Create Guide
            </button>
        </div>
    );
}