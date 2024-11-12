import { Checkbox } from 'antd'
import React from 'react'

const FilterContent = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div className="title flex justify-center">
            <p className='text-2xl font-semibold text-black '>Filters</p>
        </div>
        <div className="schedule">
            <p className='text-md text-gray-500'>Working schedule</p>
            <div className="checkboxes flex flex-col gap-2 text-lg ">
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Full time</span></div>
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Intern</span></div>
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Freelance</span> </div>
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Contractual</span> </div>
            </div>
        </div>
        <div className="type">
            <p className='text-md text-gray-500'>Employment type</p>
            <div className="checkboxes flex flex-col gap-2 text-lg ">
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Full day</span></div>
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Flexible schedule</span></div>
                <div className="flex gap-3"><Checkbox/> <span className='text-primary-color'>Distant work</span> </div>
            </div>
        </div>
    </div>
  )
}

export default FilterContent