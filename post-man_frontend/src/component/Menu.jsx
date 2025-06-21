import React, { useState } from 'react'
import { MdOutlineHistory } from "react-icons/md";
import RequestHistory from './RequestHistory';
import { FeatchHistory } from '../context/ReqestsHistoryContext';
import ReqestsHistoryContext from "../context/ReqestsHistoryContext"

function Menu({setRender}) {

  

  const [showmenu, setShowmenu] = useState(false);
  const [menuitems, setMenuitems] = useState([
    {
      name: "History",
      icon: <MdOutlineHistory />,
      active: false
    }
  ]);

  console.log(menuitems)

  const handleMenuClick = (i) => {
    setShowmenu(prev => !prev);
    const newMenuitems = [...menuitems];
    newMenuitems[i] = { ...newMenuitems[i], active: !newMenuitems[i].active };
    setMenuitems(newMenuitems);
  }

  return (
    <div className='h-full flex relative'>

      {/* This is menu icon list */}
      <div id='menu-list' className='w-14 md:w-20 p-1 bg-[var(--fade-bg)] h-full border border-gray-200 flex flex-col justify-start items-center'>
        {menuitems.map((menu, i) =>
          <div className={`cursor-pointer w-full py-4 flex flex-col justify-center items-center rounded-sm hover:bg-gray-200 text-xl text-gray-500 gap-1 ${menu.active ? 'bg-gray-200' : ''}`} key={i} title={menu} onClick={() => handleMenuClick(i)}>
            {menu.icon}
            <span className='text-xs hidden md:block'>{menu.name}</span>
          </div>
        )}
      </div>

      <ReqestsHistoryContext>
      {showmenu &&
        <div id='menu-content' className='h-full border-r border-gray-200 w-75 p-2 bg-[var(--fade-bg)] absolute left-14 md:relative md:left-0'>
          {menuitems[0].active && <RequestHistory setRender={setRender}/>}
        </div>}
      </ReqestsHistoryContext>


    </div>
  )
  }

export default Menu