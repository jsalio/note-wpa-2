import { Button, Col, Popconfirm, Row, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../context/Application.context";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Note } from "../models/db/note";
import { generateGuid } from "../utils/guid";

export const NoteList: React.FC<{ online: () => boolean, setModalVisible: (state: boolean) => void }> = (prop) => {
    const { noteTable, eventTable, setNote } = useContext(ApplicationContext);
    const [dataSet, setDataset] = useState(new Array<Note>())

    const removeRecord = (note: Note) => {
        console.log(`Remove record ${note.id}`)
        if (!prop.online()) {
            eventTable.addEvent(`__del_note_${note.id}@${note.name}`, {
                EventName: `__del_note_${note.id}@${note.name}`,
                promise: {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'pragma': 'no-cache',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(note)
                }
            }).then(() => {
                noteTable.deleteNote(note.id)
            })
        } else {
            noteTable.deleteNote(note.id)
        }
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
            render: (text, record: Note) => (<div style={{ textAlign: 'right' }}>
                <Row>
                    <Col span={12} />
                    <Col span={6}><Button type={'primary'} onClick={() => editRecord(record)}><EditOutlined /> Edit</Button></Col>
                    <Col span={6}>
                        <Popconfirm placement="topLeft" title={`Are you sure remove note ${record.id}`} onConfirm={() => removeRecord(record)} okText="Yes" cancelText="No">
                            <Button danger><DeleteOutlined /> Remove
                        </Button>
                        </Popconfirm>
                    </Col>
                </Row>
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