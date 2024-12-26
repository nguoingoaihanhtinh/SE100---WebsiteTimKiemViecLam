import { useState } from "react";
import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from "../../../redux/rtk/company.service";
import CompanyTable from "../../../components/Admin/Tables/CompanyTable";
import AddCompanyForm from "./AddCompany/AddCompany";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
const ManageCompany = () => {
  const tableHeaders = ["Image", "Name", "Field", "Description", "Rating"];
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("name-asc");
  const {
    data: companiesRes,
    isLoading,
    isError,
  } = useGetAllCompaniesQuery({
    page,
    limit: 9,
    type: "",
  });
  const [deleteCompany] = useDeleteCompanyMutation();
  const companies = companiesRes?.companies || [];
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [editCompanyIndex, setEditCompanyIndex] = useState(null);

  const toggleForm = (index = null) => {
    setEditCompanyIndex(index);
    setShowAddCompanyForm(!showAddCompanyForm);
  };
  const sortCompanies = (companies, option) => {
    switch (option) {
      case "name-asc":
        return [...companies].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...companies].sort((a, b) => b.name.localeCompare(a.name));
      case "rating-asc":
        return [...companies].sort((a, b) => a.rating - b.rating);
      case "rating-desc":
        return [...companies].sort((a, b) => b.rating - a.rating);
      default:
        return companies;
    }
  };

  const sortedCompanies = sortCompanies(companies, sortOption);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await deleteCompany(id);
    }
  };
  const handleSort = (field) => {
    setSortOption((prev) => {
      const [currentField, direction] = prev.split("-");
      if (currentField === field) {
        return direction === "asc" ? `${field}-desc` : `${field}-asc`;
      }
      return `${field}-asc`;
    });
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching companies!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {/* Main Content */}
      {!showAddCompanyForm && (
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Companies Management</h1>
            <div
              onClick={() => toggleForm()}
              className="px-4 py-2 rounded-[8px] text-white font-semibold cursor-pointer hover:bg-blue-700 transition-all border-[1px] bg-blue-600"
            >
              Add Company
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-[10px] shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-md font-medium text-[#8392a8] uppercase tracking-wider cursor-pointer"
                      onClick={
                        header === "Name"
                          ? () => handleSort("name")
                          : header === "Rating"
                          ? () => handleSort("rating")
                          : null
                      }
                    >
                      {header}
                      {["Name", "Rating"].includes(header) && (
                        <>
                          {sortOption.startsWith(header.toLowerCase()) ? (
                            sortOption.endsWith("asc") ? (
                              <FaAngleUp className="ml-2 text-sm inline-block" />
                            ) : (
                              <FaAngleDown className="ml-2 text-sm inline-block" />
                            )
                          ) : (
                            // Default state icon
                            <FaAngleDown className="ml-2 text-sm inline-block opacity-50" />
                          )}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedCompanies.map((company, index) => (
                  <CompanyTable
                    key={index}
                    rowValue={company}
                    onEdit={() => toggleForm(index)}
                    onDelete={() => handleDelete(company.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Company Form */}
      {showAddCompanyForm && (
        <AddCompanyForm
          onClose={() => toggleForm()}
          editCompany={editCompanyIndex !== null ? sortedCompanies[editCompanyIndex] : null}
          refetch={() => setEditCompanyIndex(null)}
        />
      )}
    </div>
  );
};

export default ManageCompany;
