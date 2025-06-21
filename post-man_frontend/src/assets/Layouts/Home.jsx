import React, { useEffect, useState } from 'react'
import Menu from '../../component/Menu';
import RequestMaker from '../../component/RequestMaker';
import Response from '../../component/Response';
import { saveRequest } from '../../utils/saveRequest';


function Home() {

  const[render,setRender] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetcherror, setFetchError] = useState(null);

  const makeRequest = async (reqObj) => {
    setLoading(true);
    setFetchError(null);
    let reqHeaders = {}
    let url = reqObj.url;
    reqObj.headers.forEach((h) => {
      if (h.key != "") {
        reqHeaders[h.key] = h.value;
      }
    });

    reqObj.params.forEach((p, i) => {
      if (p.key != '') {
        if (i == 0) {
          url = url + `?${p.key}=${p.value}`;
        }

        url = url + `&${p.key}=${p.value}`;
      }
    });

    console.log(url);

    let prepReqObj = {
      method: reqObj.method,
      headers: {
        'Content-Type': 'application/json',
        ...reqHeaders
      },
    }

    if(reqObj.method !== 'GET'){
      prepReqObj['body'] = reqObj.body;
    }

    try {
      let res = await fetch(url,prepReqObj);
      let status = res.status;
      let result = await res.json();

      console.log(res);
      console.log(result)
      setData({status, result});
      setLoading(false)
    } catch (error) {
      setFetchError(error.message);
      setLoading(false);
    }

    await saveRequest(reqObj);
    
  }

  return (
    <div className='grow w-full flex overflow-scroll'>
      <Menu setRender={setRender}/>
      <div className='w-full h-full flex-col gap-3'>
        <RequestMaker makeRequest={makeRequest} />
        <Response loading={loading} resObj={data} error={fetcherror} />
      </div>

    </div>
  )
}

export default Home