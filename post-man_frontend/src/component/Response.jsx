import React from 'react'
import { MdDataObject } from "react-icons/md";
import Loading from './Loading';
import JsonEditor from './JsonEditor';

function Response({ resObj, loading = true, error }) {

    const prettifyJSON = (jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            return JSON.stringify(parsed, null, 2); // 2-space indentation
        } catch (err) {
            return jsonString; // Return original if not valid JSON
        }
    }

    return (
        <div className='w-full border border-gray-300'>
            <div className='flex w-full justify-between items-center p-2 border-b border-gray-300'>
                <div className='text-sm font-bold'>Respons</div>
                {resObj && <div > Status <span className={`p-1 ${resObj.status >= 200 && resObj.status <= 299 ? ' text-green-600' : 'text-red-600'} border border-gray-300 rounded-sm`}> {resObj.status} </span></div>}
            </div>
            {
                !resObj && !loading && !error && (
                    <div id='resPlacholder' className='w-full h-40 text-4xl flex justify-center items-center flex-col text-gray-400'>
                        <MdDataObject />
                        <p className='text-sm'> Make a request to see the response</p>
                    </div>
                )
            }

            {
                loading && (
                    <div className='w-full h-40'>
                        <Loading />
                    </div>
                )
            }

            {
                !loading && !error && resObj && <div className='w-full'>
                    <JsonEditor readOnly={true} value={prettifyJSON(JSON.stringify(resObj.result))} />
                </div>
            }

            {
                error && <div className='w-full text-red-600'>{error}</div>
            }

        </div>
    )
}

export default Response