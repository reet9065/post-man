import React, { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

export const FeatchHistory = createContext();

function ReqestsHistoryContext({ children }) {
  const [page, setPage] = useState(1);
  const url = `${import.meta.env.VITE_HOST}requests?page=${page}`;
  const { data, loading, fetchError } = useFetch(url);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    
    if (data) {

    console.log(data);
     let sturcture = data.map((d) => {
        let reqObj = JSON.parse(d.reqObj)
        return {
            id:d.id,
            userId : d.userId,
            reqObj : reqObj,
            url: reqObj.url,
            method: reqObj.method 
        }
     })
      
      setRequests(prev => [...prev, ...sturcture]);
    }
  }, [data]);

  const loadMore = () => setPage(prev => prev + 1); 

  return (
    <FeatchHistory.Provider value={{ loading, fetchError, requests, loadMore }}>
      {children}
    </FeatchHistory.Provider>
  );
}

export default ReqestsHistoryContext;
