import React, { createContext, useState } from 'react'

export const Tablist = createContext()

function Tabcontext({ children }) {

    const [tab, setTab] = useState("1");
    return (
        <Tablist.Provider value={{ tab, setTab }}>
            {children}
        </Tablist.Provider>
    )
}

export default Tabcontext