import React from 'react'

const menu = [
    'Find Job',
    'Messages',
    'Hiring',
    'Community',
    'FAQ',
]
const Navigation = () => {

  return (
    <div className="flex gap-8">
      {menu.map((item, index) => (
        <div key={index} className="hover:text-primary-color cursor-pointer text-2xl">
          {item}
        </div>
      ))}
    </div>
  )
}

export default Navigation