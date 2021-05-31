import { ApplicationContext } from './context/Application.context';
import { BuildChecker } from './components/checker';
import { Button } from 'antd';
import { EventDataContext } from './Data/event.context';
import { FileAddOutlined } from '@ant-design/icons';
import { FormNote } from './components/NoteForm';
import { NoteContext } from './Data/note.context';
import { NoteList } from './components/List';
import { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { PendingTransaction } from './components/pending-transaction';

function App() {

  document.title = "WPA-Notes";

  const d = BuildChecker()
  const [note, setNote] = useState(undefined)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const initialContext = {
    noteTable: new NoteContext(),
    eventTable: new EventDataContext(),
    noteToEdit: note,
    setNote: setNote
  }
  return (
    <div className="App">
      <h3>WPA Note app{d.view}</h3>
      <ApplicationContext.Provider value={initialContext}>
        <div className={'floatButtonOverTable'}><Button onClick={() => setIsModalVisible(true)}><FileAddOutlined /> Add note</Button></div>
        <FormNote online={d.callBackState} modalIsVisible={isModalVisible} setModalVisible={setIsModalVisible} />
        <NoteList online={d.callBackState} setModalVisible={setIsModalVisible} />
        <PendingTransaction online={d.callBackState} />
      </ApplicationContext.Provider>
    </div>
  );
}

export default App;
