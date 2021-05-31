import { useState } from "react";
import { Detector } from "react-detect-offline";

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
                return <div>{online ? 'Online' : 'Offline'}</div>
            }} />
        </p>),
        callBackState: () => online
    }
}