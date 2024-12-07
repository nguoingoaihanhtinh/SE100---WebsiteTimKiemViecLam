import React from 'react'
import SearchBox from './SearchBox'

const menu = [
    'Messages',
    'Hiring',
    'Community',
    'FAQ',
]
const Navigation = () => {

  return (
    <div className="flex gap-8 items-center">

      {menu.map((item, index) => (
        <div key={index} className="hover:text-primary-color cursor-pointer text-2xl">
          {item}
        </div>
      ))}
    </div>
  )
}

export default Navigation