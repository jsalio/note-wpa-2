import { Collapse, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "../context/Application.context";

const Panel = Collapse.Panel;

export const PendingTransaction: React.FC<{ online: () => boolean }> = (props) => {
    const { eventTable } = useContext(ApplicationContext)
    let [source, setDataSource] = useState(new Array<any>());
    useEffect(() => {
        eventTable.getAllEvents().then((dataSet) => {
            setDataSource(dataSet);
        })
    }, [source, eventTable])
    return (!props.online() && <div>
        <Collapse>
            <Panel header={`Pending transaction to commit ${source.length}`} key="1">
                {source.map(x => (<p>{x.EventName}</p>))}
            </Panel>
        </Collapse>
    </div>)
}