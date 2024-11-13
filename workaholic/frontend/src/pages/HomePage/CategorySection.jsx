import React from 'react';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';

const jobType = [
    { id: 1, name: "Sales", numberOfJobs: 2, icon: <FaMoneyBillTrendUp className='w-20 h-20 text-primary-color'/> },
    { id: 2, name: "Marketing", numberOfJobs: 2 },
    { id: 3, name: "Service", numberOfJobs: 2 },
    { id: 4, name: "Human Resource", numberOfJobs: 2 },
    { id: 5, name: "Bank", numberOfJobs: 2 },
    { id: 6, name: "Technology", numberOfJobs: 2 },
    { id: 7, name: "Estate", numberOfJobs: 2 },
    { id: 8, name: "Accountant", numberOfJobs: 2 },
];

const CategorySection = () => {
    return (
        <div className="p-8">
            <p className='text-sky-400 text-3xl font-bold text-left pb-5'>Các ngành nghề nổi bật</p>
            <div className="grid grid-cols-4 gap-6">
                {jobType.map((job) => (
                    <div
                        key={job.id}
                        className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200"
                    >
                        <div className="flex justify-center p-3 ">
                            {job.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{job.name}</h3>
                        <p className="text-gray-600">Jobs available: {job.numberOfJobs}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
