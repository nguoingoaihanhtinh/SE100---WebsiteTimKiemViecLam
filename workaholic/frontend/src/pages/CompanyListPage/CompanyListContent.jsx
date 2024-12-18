import React from 'react';
import { CompanyCardHorizontal } from '../../components/Company/CompanyCardHorizontal';
import { Pagination, Empty } from 'antd';

const CompanyListContent = ({ companies, totalCompanies, page, setPage }) => {
  const validCompanies = Array.isArray(companies) ? companies : [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary-color">
          Found {totalCompanies} Companies
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {validCompanies.length === 0 ? (
          <Empty 
            description="No companies match your filters" 
            className="col-span-3"
          />
        ) : (
          validCompanies.map((company) => (
            <CompanyCardHorizontal 
              key={company.id} 
              companyData={{
                ...company,
                stats: {
                  openJobs: company.jobs?.length || 0,
                  employees: company.employeeCount,
                  rating: company.rating
                }
              }} 
            />
          ))
        )}
      </div>
      <div className="flex justify-center p-4">
        <Pagination
          current={page}
          total={totalCompanies}
          pageSize={9}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default CompanyListContent;