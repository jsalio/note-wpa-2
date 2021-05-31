import { Button, Card, Col, Input, Row } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useEffect, useState } from "react"
import { ApplicationContext } from "../context/Application.context"
import { Note } from "../models/db/note"
import { transactionStatus } from "../models/enum/transaction-status"
import { generateGuid } from "../utils/guid"


export const FormNote: React.FC<{ online: () => boolean }> = (prop) => {
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
    }

    return <div>
        <Card>
            <Row>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Row>
            <Row>
                <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Row>
            <Row>
                <TextArea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={12}>
                        <Button disabled={author === '' && name === '' && details === ''} onClick={isEditMode ? handlerClickEdit : handlerClickSave}>{!isEditMode ? 'Save' : 'Save changes'}</Button>
                        <Button disabled={author === '' && name === '' && details === ''} onClick={handlerCancelForm}>{isEditMode ? 'Cancel' : 'Clean'}</Button>
                    </Col>
                </Col>
            </Row>
        </Card>
    </div>
}