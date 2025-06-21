import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";

function RequestHistoryItem({ method, url, id , handelReqClicked}) {
    return (
        <>
            <div className='flex justify-start hover:bg-gray-200 cursor-pointer gap-2' onClick={() => handelReqClicked(id)}>
                <div className={`text-xs flex justify-center items-center ${method == 'GET' ? 'text-green-600' : method == "POST" ? 'text-yellow-500' : method == "PUT" ? 'text-blue-500' : method == 'DELET' ? 'text-red-500' : method == "PATCH" ? 'text-violet-700' : ''}`}>{method}</div>
                <div className='text-sm flex-1 truncate flex justify-start items-center'>{url}</div>
                {/* <div className='text-sm p-1 flex justify-center items-center hover:text-gray-800 hover:bg-gray-300 text-gray-400' ><RiDeleteBin5Line /></div> */}
            </div>
        </>
    )
}

export default RequestHistoryItem