import React from "react";
import "./index.css";


interface Note {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface SidebarProps {
  notes: Note[];
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  activeNote: string|null;
  setActiveNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
  // setNotes
}) => {


  const sortedNotes = notes.sort(
    (a: Note, b: Note) => b.lastModified - a.lastModified
  );

  /*   
  
  const uploadNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const uploadedNotes: Note[] = JSON.parse(content);
            if (Array.isArray(uploadedNotes) && uploadedNotes.every(note => note.id && note.title && note.body && note.lastModified)) {
              setNotes(uploadedNotes.map(note => ({ ...note, lastModified: new Date(note.lastModified).getTime() })));
            } else {
              alert("Invalid file format");
            }
          } catch (error) {
            alert("Error reading file");
          }
        };
        reader.readAsText(file);
      }
    };
  
  
   */



  const downloadNotes = () => {
    const notesToDownload = notes.map(note => ({ ...note, lastModified: new Date(note.lastModified).toISOString() }));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notesToDownload));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "notes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex flex-col p-5 bg-gray-900 h-full w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-white">NoteEase</h1>

      </div>
      <div className="flex gap-3 items-center mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={downloadNotes}>Download</button>

        {/* <label className="bg-orange-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition duration-200">
          Upload
          <input type="file" accept=".json" onChange={uploadNotes} className="hidden" />
        </label> */}


        <button className="bg-green-500 text-white px-7 py-2 rounded" onClick={onAddNote}>Add</button>
      </div>
      <div className="overflow-y-auto flex-grow custom-scrollbar pr-1">
        {sortedNotes.map((note: Note) => (
          <div
            key={note.id}
            className={`p-4 mb-2 rounded cursor-pointer ${note.id === activeNote ? "bg-white text-black" : "bg-black text-white"}`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="flex justify-between items-center">
              <strong className="text-lg">{note.title}</strong>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>
            {/* <p className="text-gray-400">{note.body && note.body.substr(0, 20) + "...."}</p> */}
            <small className="text-gray-500">
              Last Updated:{" "}
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
