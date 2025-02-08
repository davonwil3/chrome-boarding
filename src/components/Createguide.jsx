import React from "react";

export default function CreateGuide({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full px-8 text-white ">
           <p>Create a guide</p>
        
        <input
            type="text"
            placeholder="Guide Name"
            className="mt-2 p-2 border rounded"
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full">
            Create Guide

        </button>
        </div>

    );
}