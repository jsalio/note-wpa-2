import { Card, Input, Modal, Row } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useEffect, useState } from "react"
import { ApplicationContext } from "../context/Application.context"
import { Note } from "../models/db/note"
import { transactionStatus } from "../models/enum/transaction-status"
import { generateGuid } from "../utils/guid"


export const FormNote: React.FC<{ online: () => boolean, modalIsVisible: boolean, setModalVisible: (state: boolean) => void }> = (prop) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [details, setDetails] = useState('')
    const [isEditMode, setEditMode] = useState(false);
    var { noteTable, noteToEdit, setNote } = React.useContext(ApplicationContext)

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
        noteTable.addNote(noteToEdit.id, noteToEdit).then(() => {
            setName('');
            setAuthor('');
            setDetails('');
            setEditMode(false)
            prop.setModalVisible(false)
        })

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
        title="Add new note"
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