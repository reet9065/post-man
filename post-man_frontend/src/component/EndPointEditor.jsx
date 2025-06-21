import React, { useRef } from 'react'

function EndPointEditor({ url, method, setReqObj, submitReq }) {

    const selectedMethod = useRef();
    const typedURL = useRef();

    const handleEndpointEditorChange = () => {
        setReqObj(prev => ({ ...prev, method: selectedMethod.current.value, url: typedURL.current.value }))
    }


    return (
        <div className='flex items-center w-full gap-2'>
            <div className='flex flex-1 w-full border border-gray-300 rounded-sm '>
                <select name="method" id="method" className='p-3' ref={selectedMethod} onChange={() => handleEndpointEditorChange()} value={method}>
                    <option value="GET" className='text-green-600'>GET</option>
                    <option value="POST" className='text-yellow-500'>POST</option>
                    <option value="DELETE" className='text-red-500'>DELETE</option>
                    <option value="PUT" className='text-blue-500'>PUT</option>
                    <option value="PATCH" className='text-violet-700'>PATCH</option>
                </select>
                <input ref={typedURL} type="text" className='p-3 w-full focus:outline-2 focus:outline-blue-500' placeholder='Enter URL' value={url} onChange={() => handleEndpointEditorChange()} />
            </div>
            <button type='button' className='py-3 rounded-sm font-bold px-4 text-white bg-blue-600 cursor-pointer' onClick={() => submitReq(JSON.parse(localStorage.getItem('reqObj')))}>Send</button>
        </div>
    )
}

export default EndPointEditor