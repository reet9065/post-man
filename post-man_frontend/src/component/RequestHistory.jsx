import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoFilter } from "react-icons/io5";
import RequestHistoryItem from './RequestHistoryItem';
import { FeatchHistory } from '../context/ReqestsHistoryContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

function RequestHistory({setRender}) {

    const { loading, fetchError, requests, loadMore } = useContext(FeatchHistory)
    const [focus, setFocus] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate()

    //   console.log(requests);

    const handelReqClicked = (id) => {
        console.log("seted")
        localStorage.setItem('reqObj', JSON.stringify(requests[id].reqObj));
        setRender(prev => prev+1);
    }



    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;

            const { scrollTop, scrollHeight, clientHeight } = container;


            if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
                loadMore()
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        // Cleanup on unmount
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]);

    return (
        <div className={`w-full ${focus ? 'bg-white' : ''}`}>
            <div className='flex w-full border border-gray-200 rounded-sm gap-1'>
                <div className={`flex justify-center items-center text-gray-400 p-1 ${focus ? 'bg-white text-gray-800' : 'text-gray-400'}`}>
                    <IoFilter />
                </div>
                <input
                    type="text"
                    className='grow focus:outline-0 focus:border-0 text-xs'
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </div>

            <div
                ref={containerRef}
                id='request-history-container'
                className='flex flex-col mt-1 gap-0.5 overflow-y-auto max-h-[400px]'
            >
                <span className='text-xs text-gray-400'>
                    Today <hr className='text-gray-300' />
                </span>

                {requests.map((req, idx) => (
                    <RequestHistoryItem key={idx} method={req.method} url={req.url} id={idx} handelReqClicked={handelReqClicked} />
                ))}

                {loading && (
                    <div className='h-5 opacity-50'><Loading /></div>
                )}
            </div>
        </div>
    );
}

export default RequestHistory;
