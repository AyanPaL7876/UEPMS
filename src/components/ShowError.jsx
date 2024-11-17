import { set } from 'lodash';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'

function ShowError({error}) {
    const [showMessage, setShowMessage] = useState(true);
    const handleClick = () => {
        setShowMessage(false);
    }

    useEffect(() => {
        setShowMessage(true);
    }, [error]);

  return (
    <div className={`w-full h-10 bg-red-600/10 border border-red-600 rounded-sm px-4 py-2 flex justify-start items-center ${showMessage?"flex":"hidden"}`} >
        <h1 className='text-red-600'>{error}</h1>
        <button className='ml-auto' onClick={handleClick}>
            <Plus className='w-6 h-6 text-red-600 rotate-45'/>
        </button>
    </div>
  )
}

export default ShowError