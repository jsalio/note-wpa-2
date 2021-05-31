import React, { useState } from "react";
import { Detector } from "react-detect-offline";
import { JsxElement } from "typescript";

export const BuildChecker = (): { c: JSX.Element, f: () => boolean } => {
    const [online, setOnline] = useState(false)
    return {
        c: (<p>
            <Detector render={({ online }) => {
                setOnline(online)
                return <div>{online ? 'Online' : 'Offline'}</div>
            }} />
        </p>),
        f: () => online
    }
}