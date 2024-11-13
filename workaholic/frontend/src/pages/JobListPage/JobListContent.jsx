import React from 'react'
import Jobs from '../../components/Job/Jobs'
import { FaAngleRight } from 'react-icons/fa6'

const JobListContent = () => {
  return (
    <div className="mt-12 w-full">
      <div className="flex justify-between items-center w-full">
        <header className="font-serif text-4xl font-medium my-4 text-blue-950">
          Recommended Jobs
        </header>
        
        <div className="group flex items-center gap-4 cursor-pointer">
          <p className="font-semibold group-hover:underline transition-all">
            View all
          </p>
          <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
            <FaAngleRight className="text-lg" />
          </div>
        </div>
      </div>
      <Jobs />
      {/* <div className="w-full flex justify-center mt-5">
        <Pagination className="items-center" onChange={(page) => {
          setPage(page)
        }} total={total} defaultCurrent={1} pageSize={4}/>
      </div> */}
    </div>
  )
}

export default JobListContent
