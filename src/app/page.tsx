"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import uuid from "react-uuid";
import MainContent from "@/components/Main";

type Note = {
  id: string;
  title: string;
  body: string;
  lastModified: number;
};

const Main = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote: Note = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (idToDelete: string) => {
    setNotes(notes.filter((note: Note) => note.id !== idToDelete));
  };






  return (
    <div className="h-full w-full flex flex-col md:flex-row">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        setNotes={setNotes}
        onDeleteNote={onDeleteNote}

      />
      <MainContent
        activeNote={notes.find((note) => note.id === activeNote)}
        onUpdateNote={(updatedNote: Note) => {
          const updatedNotesArray = notes.map((note: Note) => {
            if (note.id === updatedNote.id) {
              return updatedNote;
            }
            return note;
          });
          setNotes(updatedNotesArray);
        }}
      />
    </div>
  );
};

export default Main;