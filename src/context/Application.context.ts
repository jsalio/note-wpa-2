import React from "react";
import { EventDataContext } from "../Data/event.context";
import { NoteContext } from "../Data/note.context";
import { Note } from "../models/db/note";

export type Context = {
    noteTable: NoteContext,
    eventTable: EventDataContext
    noteToEdit: Note | undefined
    setNote: (note: Note) => void
}

const defaultBuild: Context = {
    noteTable: new NoteContext(),
    eventTable: new EventDataContext(),
    noteToEdit: undefined,
    setNote: (note: Note) => { }
}

export const ApplicationContext = React.createContext(defaultBuild)