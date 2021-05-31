import React from "react";
import { NoteContext } from "../Data/note.context";
import { Note } from "../models/db/note";

export type Context = {
    noteTable: NoteContext
    noteToEdit: Note | undefined
    setNote: (note: Note) => void
}

const defaultBuild: Context = {
    noteTable: new NoteContext(),
    noteToEdit: undefined,
    setNote: (note: Note) => { }
}

export const ApplicationContext = React.createContext(defaultBuild)