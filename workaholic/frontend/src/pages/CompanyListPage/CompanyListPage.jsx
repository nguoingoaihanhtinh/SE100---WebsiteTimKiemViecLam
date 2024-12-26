import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import CompanyListContent from "./CompanyListContent";
import CompanyBanner from "./CompanyBanner";
import SortBar from "../../components/filter/SortBar";
import axios from "axios";
import { useGetAllCompaniesQuery } from "../../redux/rtk/company.service";

const CompanyListPage = () => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const { data, error, isLoading } = useGetAllCompaniesQuery({ page, limit });
  const [companies, setCompanies] = useState([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // const [loading, setLoading] = useState(false);

  // const getAllCompanies = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/companies?page=${page}&limit=9`);
  //     if (response.data) {
  //       setCompanies(response.data.companies);
  //       setTotalCompanies(response.data.totalCompanies);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching companies:', error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getAllCompanies();
  // }, [page]);
  useEffect(() => {
    if (data) {
      setCompanies(data.companies);
      setTotalCompanies(data.totalCompanies);
      setTotalPages(Math.ceil(data.totalCompanies / limit));
    }
  }, [data]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="bg-primary-color w-full p-5">
        <SortBar />
      </div>
      <div className="banner">
        <CompanyBanner />
      </div>
      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter />
        </div>
        <div className="content w-3/4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <CompanyListContent
              companies={companies}
              totalCompanies={totalCompanies}
              totalPages={totalPages}
              page={page}
              setPage={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyListPage;
