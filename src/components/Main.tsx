import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Note {
    id: string;
    title: string;
    body: string;
    lastModified: string;
}

interface MainProps {
    activeNote: Note | null;
    onUpdateNote: (note: Note) => void;
}

const Main = ({ activeNote, onUpdateNote }: MainProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const onEditField = (key: keyof Note, value: string) => {
        if (activeNote) {
            onUpdateNote({
                ...activeNote,
                [key]: value,
                lastModified: Date.now().toString(),
            });
        }
    };

    if (!activeNote)
        return (
            <div className="flex items-center justify-center h-full w-full text-gray-500">
                Please Select or Create a new note
            </div>
        );

    return (
        <div className="flex flex-col h-full w-full p-4">

            <div className="mb-4 flex justify-between items-center">
                <button
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Save" : "Edit"}
                </button>
            </div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        className="w-full p-2 border bg-black border-gray-300 rounded mb-2"
                        value={activeNote.title}
                        onChange={(e) => onEditField("title", e.target.value)}
                        autoFocus
                    />
                    <textarea
                        id="body"
                        className="w-full p-2 border bg-black border-gray-300 rounded h-64 mb-4"
                        value={activeNote.body}
                        onChange={(e) => onEditField("body", e.target.value)}
                    />
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto">
                    <h1 className="text-5xl text-center font-bold mb-4">{activeNote.title}</h1>
                    <ReactMarkdown>{activeNote.body}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default Main;
