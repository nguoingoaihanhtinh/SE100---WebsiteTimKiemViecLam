import React from 'react'
import Jobs from '../../components/Job/Jobs'
import { FaAngleRight } from 'react-icons/fa6'
import { JobCardHorizontal } from '../../components/Job/JobCarHorizontal';
import { Button } from 'antd';
import { CompanyCardHorizontal } from '../../components/Company/CompanyCardHorizontal';
import SmallBanner from './SmallBanner';
import Banner2 from './Banner2';
export const fakeJobs = [
  {
    id: 1,
    title: "Frontend Developer for Google",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",  // Replace with actual image URL
    rating: 4.5,
    location: "Ho Chi Minh City",
    position: "Frontend Developer",
    experience: "2+ years",
    schedule: "Full time",
    type: "Remote",
    salary: 15000000,
    paymentBy: "per month",
  },
  {
    id: 2,
    title: "Backend Developer for Twitch.tv",
    img: "https://assets.twitch.tv/assets/mobile_iphone-526a4005c7c0760cb83f.png",  // Replace with actual image URL
    rating: 45,
    location: "Da Nang",
    position: "Backend Developer",
    experience: "3+ years",
    schedule: "Full time",
    type: "On-site",
    salary: 20000000,
    paymentBy: "per month",
  },
  {
    id: 3,
    title: "Designer for youtube",
    img: "https://cdn.pixabay.com/photo/2017/06/23/02/35/youtube-2433301_640.png",  // Replace with actual image URL
    rating: 4.2,
    location: "Hanoi",
    position: "Designer",
    experience: "1+ years",
    schedule: "Freelance",
    type: "Remote",
    salary: 12000000,
    paymentBy: "per month",
  },  
  {
    id: 4,
    title: "Product Manager at Tech Corp",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s",
    rating: 4.6,
    location: "Ho Chi Minh City",
    position: "Product Manager",
    experience: "5+ years",
    schedule: "Full time",
    type: "On-site",
    salary: 25000000,
    paymentBy: "per month",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpPbT_OKGrXzCWS-uxgJYZXD23p8LT3_Q_w&s",
    rating: 3,
    location: "Hai Phong",
    position: "Business Analyst",
    experience: "2+ years",
    schedule: "Full time",
    type: "On-site",
    salary: 13000000,
    paymentBy: "per month",
  },
  {
    id: 6,
    title: "Data Analyst at Tech Innovators",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMrvFtbhCbe4n6Xo_Xqrud96auL7pUTTfRA&s",
    rating: 4.4,
    location: "Da Nang",
    position: "Business Analyst",
    experience: "2+ years",
    schedule: "Part-time",
    type: "Remote",
    salary: 16000000,
    paymentBy: "per month",
  },
];
export const jobtype = [
  {
    id: 1,
    name: "bank"
  },
  {
    id: 2,
    name: "estate"
  },
  {
    id: 3,
    name: "construction"
  },
  {
    id: 4,
    name: "technology"
  },
  {
    id: 5,
    name: "sales"
  },
  {
    id: 6,
    name: "economic"
  },
];
export const fakeCompany = [
  {
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
    name: "Google",
    type: "technology",
    jobs: 2,
  },
  {
    id: 2,
    img: "https://assets.twitch.tv/assets/mobile_iphone-526a4005c7c0760cb83f.png",
    name: "Twitch.tv",
    type: "technology",
    jobs: 1
  },
  {
    id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpPbT_OKGrXzCWS-uxgJYZXD23p8LT3_Q_w&s",
    name: "Foodie",
    type: "Sales",
    jobs: 3
  },
  {
    id: 4,
    img: "https://cdn.pixabay.com/photo/2017/06/23/02/35/youtube-2433301_640.png", 
    name: "Youtube",
    type: "construction",
    jobs: 1
  },
  {
    id: 5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s",
    name: "Tech Corp",
    type: "economic",
    jobs: 1
  },
]
const HomeContent = () => {
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
      <div className="grid grid-cols-3 gap-5">
      {fakeJobs.map((job) => (
        <JobCardHorizontal key={job.id} jobData={job} />
      ))}
      </div>
      <div className="company rounded-xl shadow-md mt-10 border">
          <div className="heading rounded-t-xl bg-sky-400 flex">
            <div className="w-3/5 flex flex-col justify-center gap-5 text-left px-5">
            <p className='text-3xl font-bold text-primary'>Thương hiệu lớn tiêu biểu</p>
            <p className='text-primary-color font-semibold'>Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.</p>
            </div>
            <div className="w-2/5 bg-cover bg-center bg-no-repeat h-[140px] p-2" style={{
                backgroundImage: `url(https://media.tapchitaichinh.vn/w1480/images/upload/hoangthuviet/07292019/0_10-thuong-hieu-dan-dau-viet-nam-dat-gia-tri-gan-7.jpg)`,
              }}>
            </div>
          </div>
          <div className="category flex justify-between px-14 py-5 border-t gap-1">
            <Button className='min-w-35 text-lg'>All</Button>
            {jobtype.map((type) => (
              <Button key={type.id} className='min-w-35 text-lg'>{type.name}</Button>
            ))}
          </div>
          <div className="companyCard grid grid-cols-3 gap-5 px-5">
            {fakeCompany.map((company) => (
              <CompanyCardHorizontal key={company.id} companyData={company} />
            ))}
          </div>
          <Button className='bg-sky-800 text-white font-bold text-xl h-[46px] rounded-l-2xl rounded-r-2xl p-5 m-5'>Tìm hiểu thêm về các công ty</Button>
      </div>
      <div className="suitable">
        <div className="flex justify-between items-center w-full">
          <header className="font-serif text-4xl font-medium my-4 text-blue-950">
              Suitable for you!
          </header>
          <div className="group flex items-center gap-4 cursor-pointer">
            <p className="font-semibold group-hover:underline transition-all text-primary-color">
              View all
            </p>
            <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
              <FaAngleRight className="text-lg" />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="grid grid-cols-2 gap-5 w-3/5">
          {fakeJobs.slice(0,4).map((job) => (
            <div className="bg-green-50 rounded-xl">
              <JobCardHorizontal  key={job.id} jobData={job} />
            </div>
          ))}
          </div>
          <div className="w-2/5">
          <SmallBanner/>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center mt-5">
        <Pagination className="items-center" onChange={(page) => {
          setPage(page)
        }} total={total} defaultCurrent={1} pageSize={4}/>
      </div> */}
    </div>
  )
}

export default HomeContent
