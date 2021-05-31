import { useState } from "react";
import { Detector } from "react-detect-offline";
import { WifiOutlined, GlobalOutlined } from '@ant-design/icons';

type ConnectionChecker = {
    view: JSX.Element,
    callBackState: () => boolean
}

export const BuildChecker = (): ConnectionChecker => {
    const [online, setOnline] = useState(false)
    return {
        view: (<p>
            <Detector render={({ online }) => {
                setOnline(online)
                return <div>{online ? <span> <WifiOutlined /> Online</span> : <span><GlobalOutlined /> Offline</span>}</div>
            }} />
        </p>),
        callBackState: () => online
    }
}