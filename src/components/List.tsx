import { Button, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../context/Application.context";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Note } from "../models/db/note";
import { generateGuid } from "../utils/guid";

export const NoteList: React.FC<{ online: () => boolean, setModalVisible: (state: boolean) => void }> = (prop) => {
    const { noteTable, setNote } = useContext(ApplicationContext);
    const [dataSet, setDataset] = useState(new Array<Note>())

    const removeRecord = (note: Note) => {
        console.log(`Remove record ${note.id}`)
        noteTable.deleteNote(note.id)
    }

    const editRecord = (note: Note) => {
        console.log(`edited record ${note.id}`)
        prop.setModalVisible(true);
        setNote(note)
    }

    const columns = [
        {
            title: 'Note Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record: Note) => (<div>
                <Button onClick={() => removeRecord(record)}><DeleteOutlined /> Remove</Button>
                <Button onClick={() => editRecord(record)}><EditOutlined /> Edit</Button>
            </div>)
        },
    ];


    useEffect(() => {
        noteTable.getAllNote()
            .then((data) => {
                setDataset(data)
            })
    }, [dataSet, noteTable])
    return <div>
        <Table dataSource={dataSet} columns={columns} rowKey={generateGuid()} />
    </div>
}