import React from "react";

export type Context = {
    online: boolean;
    setOnline: (status: boolean) => void;
}

const defaultBuild: Context = {
    online: false,
    setOnline: (status: boolean) => { }
}

export const ApplicationContext = React.createContext(defaultBuild)