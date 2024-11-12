import React from 'react'
import Security from './Security'
import FilterContent from './FilterContent'

const Filter = () => {
  return (
    <div className='flex flex-col mt-30 px-5'>
        <Security/>
        <FilterContent/>
    </div>
  )
}

export default Filter