import React from "react";

export default function CreateGuide({ navigateTo }) {
    return (
        <div className="flex flex-col w-full h-full px-8 ">
           <p>Create a guide</p>
        
        <input
            type="text"
            placeholder="Guide Name"
            className="mt-2 p-2 border rounded"
        />
        </div>

    );
}