import React, { useContext } from 'react'
import { Tablist } from '../context/Tabcontext'

function Tab({ lable, value }) {

    const { tab, setTab } = useContext(Tablist);

    return (
        <div className={`text-sm py-2 border-b hover:text-gray-800 cursor-pointer ${value == tab ? 'text-gray-800 border-[var(--primary-color)]' : 'text-gray-500 border-white'}`} onClick={() => setTab(value)}>{lable}</div>
    )
}

export default Tab