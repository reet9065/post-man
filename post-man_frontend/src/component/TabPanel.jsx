import React, { Children, useContext } from 'react'
import { Tablist } from '../context/Tabcontext'

function TabPanel({ value, children }) {
    const { tab } = useContext(Tablist);
    return (

        <div className={`w-full  ${value == tab ? 'block' : 'hidden'}`}>{children}</div>
    )
}

export default TabPanel