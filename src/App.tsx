import './App.css';
import { ApplicationContext } from './context/Application.context';
import { BuildChecker } from './checker';
import { NoteContext } from './Data/note.context';
import 'antd/dist/antd.css';
import { NoteList } from './components/List';
import { FormNote } from './components/NoteForm';
import { useState } from 'react';
import { Button } from 'antd';

function App() {
  const d = BuildChecker()
  const [note, setNote] = useState(undefined)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialContext = {
    noteTable: new NoteContext(),
    noteToEdit: note,
    setNote: setNote
  }
  return (
    <div className="App">
      {d.view}
      <ApplicationContext.Provider value={initialContext}>
        <Button onClick={() => setIsModalVisible(true)}>Add note</Button>
        <FormNote online={d.callBackState} modalIsVisible={isModalVisible} setModalVisible={setIsModalVisible} />
        <NoteList online={d.callBackState} setModalVisible={setIsModalVisible} />
      </ApplicationContext.Provider>
    </div>
  );
}

export default App;
