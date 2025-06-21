import React from 'react'

function Tabs({children}) {
  return (
    <div className='flex justify-start items-center gap-5 mb-2'>
        {/* Here comes the Tab.jsx */}
        {children} 
    </div>
  )
}

export default Tabs