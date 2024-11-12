import { Button } from 'antd'
import React from 'react'
import { FaFingerprint } from 'react-icons/fa6'

const Security = () => {
  return (
    <div className="flex justify-center">
         <div className=' flex bg-blue-900 flex-col rounded-xl items-center gap-3 w-[274px] h-[288px] '>
        <div className="icon border bg-white w-[76px] h-[76px] rounded-full flex items-center justify-center mt-5">
            <FaFingerprint className='text-blue-900 w-12 h-12'/>
        </div>
        <div className="title text-xl font-semibold">
            <p>Update your data!</p>
        </div>
        <div className="desc text-sm">
            <p>Update your data and find the best opportunities</p>
        </div>
        <Button className='bg-cyan-200 w-[210px] h-[46px] rounded-l-2xl rounded-r-2xl'>Update now</Button>
    </div>
  
    </div>
  )
}

export default Security