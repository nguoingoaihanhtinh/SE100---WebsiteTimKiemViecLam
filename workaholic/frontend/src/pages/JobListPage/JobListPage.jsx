import React from 'react'
import Filter from '../../components/filter/Filter'
import JobListContent from './JobListContent'
import JobBanner from './JobBanner'

const JobListPage = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
        <div className="banner">
            <JobBanner />
        </div>
        <div className='w-full flex gap-10 '>
            <div className="filter w-1/4 items-center">
                <Filter />
            </div>
            <div className="content w-3/4">
                <JobListContent />
            </div>
        </div>
    </div>
    
  )
}

export default JobListPage
