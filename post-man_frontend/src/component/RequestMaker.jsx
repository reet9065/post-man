import React, { useEffect, useState } from 'react'
import Tabcontext from '../context/Tabcontext'
import Tabs from './Tabs'
import Tab from './Tab'
import TabPanel from './TabPanel'
import DInputTable from './DInputTable'
import JsonEditor from './JsonEditor'
import EndPointEditor from './EndPointEditor'

function RequestMaker({makeRequest}) {

  const [reqObj, setReqObj] = useState(JSON.parse(localStorage.getItem('reqObj')) || {
    url: "",
    method: "GET",
    headers: [],
    body: '',
    params: [],
  });

  const [error, setError] = useState({});

  useEffect(() => {
    localStorage.setItem('reqObj', JSON.stringify(reqObj));
  }, [reqObj])

  const handleJsonEditorChange = (value) => {
    console.log(value);

    const removeEditorError = () => {
      let prevError = { ...error };
      delete prevError.bodyEditor;
      setError(prevError);
    }

    setReqObj(prev => ({ ...prev, body: value }));

    if (value == '') {
      removeEditorError();
      return;
    }

    try {
      JSON.parse(value);
      removeEditorError()
    } catch (error) {
      setError(prev => ({ ...prev, bodyEditor: error.message }));
    }

  }

  const submitReq = (reqObj) => {
    makeRequest(reqObj);
  }

  return (
    <div className='px-4 py-2 w-full'>
      <EndPointEditor method={reqObj.method} url={reqObj.url} setReqObj={setReqObj} submitReq={submitReq}/>
      <Tabcontext>
        <Tabs>
          <Tab lable="Parms" value="1" />
          <Tab lable="Header" value="2" />
          <Tab lable="Body" value="3" />
        </Tabs>
        <TabPanel value="1"><DInputTable reqProps={reqObj.params} setReqObj={setReqObj} propertie='params' lable="Query Params" /></TabPanel>
        <TabPanel value="2"><DInputTable reqProps={reqObj.headers} setReqObj={setReqObj} propertie='headers' lable="Headers" /></TabPanel>
        <TabPanel value="3">
          <div className={`w-full p-2 border-2 ${error.bodyEditor ? 'border-red-700' : 'border-gray-200'}`}>
            <p className='text-gray-400 font-bold mb-2'> Body <span className='text-xs text-blue-700'>Json</span> </p>
            <JsonEditor onChange={handleJsonEditorChange} height='150px' value={reqObj.body} />
            {error.bodyEditor && <p className='text-xs text-red-700'>{error.bodyEditor}</p>}
          </div>
        </TabPanel>
      </Tabcontext>
    </div>
  )
}

export default RequestMaker