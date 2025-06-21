import React, { useEffect, useState } from 'react'
import { IoIosRemoveCircle } from "react-icons/io";

function DInputTable({ reqProps, setReqObj, propertie, lable }) {

    const [props, setProps] = useState(reqProps || []);

    useEffect(() => {

        if (props.length == 0) {
            setProps([{
                key: '',
                value: ''
            }])
        }
    }, []);

    useEffect(() => {
        setReqObj(prevReqObj => {
            return { ...prevReqObj, [propertie]: props }
        });
    }, [props])

    const handleKeyChange = (e, i) => {
        let prevProp = [...props];
        prevProp[i] = { ...prevProp[i], key: e.target.value };
        setProps(prevProp);

    }

    const handleValueChange = (e, i) => {
        let prevProp = [...props];
        prevProp[i] = { ...prevProp[i], value: e.target.value };
        setProps(prevProp);
    }

    const handleAddClick = () => {
        let prevProp = [...props];
        prevProp.push({
            key:'',
            value:''
        });
        setProps(prevProp);
    }

    const handleRemove = (i) => {
        let prevProp = [...props];
        prevProp.splice(i,1);
        setProps(prevProp);
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <p className='text-gray-400 font-bold'> {lable} </p>
            <table className='w-full outline outline-gray-200 rounded-sm overflow-hidden'>
                <thead>
                    <tr >
                        <th className='border border-collapse border-gray-200 p-1'> Key </th>
                        <th className='border border-collapse border-gray-200 p-1'>Value</th>
                        <th className='border border-collapse border-gray-200 p-1'> </th>
                    </tr>
                </thead>
                <tbody >
                    {props.map((prop, i) => (
                        <tr key={i}>
                            <td className='border border-collapse border-gray-200 p-1'><input type='text' value={prop.key} placeholder='Key' onChange={(e) => handleKeyChange(e, i)} className='w-full focus:outline-0 p-1 focus:bg-gray-200' /></td>
                            <td className='border border-collapse border-gray-200 p-1'><input type='text' value={prop.value} placeholder='Value' onChange={(e) => handleValueChange(e, i)} className='w-full focus:outline-0 p-1 focus:bg-gray-200' /></td>
                            {
                                i !== 0 && <td onClick={() => handleRemove(i)} className='border border-collapse border-gray-200 p-1  text-gray-400 hover:text-red-600 cursor-pointer'><IoIosRemoveCircle /></td>
                            }

                        </tr>
                    ))}
                </tbody>

            </table>

            <button onClick={()=> handleAddClick()} type='button' className='self-end p-1 cursor-pointer rounded-sm border-2 border-[var(--primary-color)] px-2 hover:bg-[var(--primary-color)] hover:text-white duration-300'>Add</button>
        </div>
    )
}

export default DInputTable