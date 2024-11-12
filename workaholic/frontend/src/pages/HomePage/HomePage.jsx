import React from 'react'
import Filter from '../../components/filter/Filter'
import HomeContent from './HomeContent'
import Banner from './Banner'

const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
        <div className="banner">
            <Banner />
        </div>
        <div className='w-full flex gap-10 '>
            <div className="filter w-1/4 items-center">
                <Filter />
            </div>
            <div className="content w-3/4">
                <HomeContent />
            </div>
        </div>
    </div>
    
  )
}

export default HomePage
