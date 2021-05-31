import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { ApplicationContext } from '../context/Application.context';
import {
    Card,
    Input,
    Modal,
    Row
} from 'antd';
import { generateGuid } from '../utils/guid';
import { Note } from '../models/db/note';
import { transactionStatus } from '../models/enum/transaction-status';


export const FormNote: React.FC<{ online: () => boolean, modalIsVisible: boolean, setModalVisible: (state: boolean) => void }> = (prop) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [details, setDetails] = useState('')
    const [isEditMode, setEditMode] = useState(false);
    var { noteTable, eventTable, noteToEdit, setNote } = React.useContext(ApplicationContext)

    useEffect(() => {
        if (noteToEdit !== undefined) {
            setName(noteToEdit.name);
            setAuthor(noteToEdit.author);
            setDetails(noteToEdit.text);
            setEditMode(true)
        }
    }, [noteToEdit])

    const handlerClickSave = () => {
        console.log('try to save content')
        let note: Note = {
            id: generateGuid(),
            name: name,
            author: author,
            date: new Date().toDateString(),
            text: details,
            transactionStatus: transactionStatus.pending
        }
        if (!prop.online()) {
            eventTable.addEvent(`__add_note_${note.id}@${note.name}`, {
                EventName: `__add_note_${note.id}@${note.name}`,
                promise: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(note)
                }
            }).then(() =>
                noteTable.addNote(note.id, note).then(() => {
                    setName('');
                    setAuthor('');
                    setDetails('');
                    prop.setModalVisible(false)
                }))
        }
        noteTable.addNote(note.id, note).then(() => {
            setName('');
            setAuthor('');
            setDetails('');
            prop.setModalVisible(false)
        })

    }

    const handlerClickEdit = () => {
        noteToEdit.author = author;
        noteToEdit.name = name;
        noteToEdit.text = details;

        if (!prop.online()) {
            eventTable.addEvent(`__update_note_${noteToEdit.id}@${noteToEdit.name}`, {
                EventName: `__update_note_${noteToEdit.id}@${noteToEdit.name}`,
                promise: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(noteToEdit)
                }
            }).then(() => {
                noteTable.addNote(noteToEdit.id, noteToEdit).then(() => {
                    setName('');
                    setAuthor('');
                    setDetails('');
                    setEditMode(false)
                    prop.setModalVisible(false)
                })
            })

        } else {
            noteTable.addNote(noteToEdit.id, noteToEdit).then(() => {
                setName('');
                setAuthor('');
                setDetails('');
                setEditMode(false)
                prop.setModalVisible(false)
            })
        }



    }

    const handlerCancelForm = () => {
        setName('');
        setAuthor('');
        setDetails('');
        if (isEditMode) {
            setNote(undefined)
            setEditMode(false)
        }
        prop.setModalVisible(false)
    }

    return <Modal
        title={isEditMode ? `Edit note ${noteToEdit.id}` : "Add new note"}
        centered
        visible={prop.modalIsVisible}
        onOk={isEditMode ? handlerClickEdit : handlerClickSave}
        onCancel={handlerCancelForm}
        okButtonProps={
            {
                disabled: author === '' && name === '' && details === ''
            }
        }
        okText={!isEditMode ? 'Save' : 'Save changes'}
        cancelText={'Cancel'}
        width={1000}
    >
        <Card>
            <Row>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Row>
            <Row>
                <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Row>
            <Row>
                <TextArea style={{ height: '600px' }} placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </Row>
        </Card>
    </Modal>
}