import './App.css';
import { ApplicationContext } from './context/Application.context';
import { BuildChecker } from './checker';
import { NoteContext } from './Data/note.context';
import 'antd/dist/antd.css';
import { NoteList } from './components/List';
import { FormNote } from './components/NoteForm';
import { Note } from './models/db/note';
import { useState } from 'react';

function App() {
  const d = BuildChecker()
  const [note, setNote] = useState({} as Note | undefined)
  const initialContext = {
    noteTable: new NoteContext(),
    noteToEdit: note,
    setNote: setNote
  }
  return (
    <div className="App">
      {d.view}
      <ApplicationContext.Provider value={initialContext}>
        <FormNote online={d.callBackState} />
        <NoteList online={d.callBackState} />
      </ApplicationContext.Provider>
    </div>
  );
}

export default App;
