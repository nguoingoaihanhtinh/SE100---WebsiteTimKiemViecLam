import { useState } from "react";
import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from "../../../redux/rtk/company.service";
import CompanyTable from "../../../components/Admin/Tables/CompanyTable";
import AddCompanyForm from "./AddCompany/AddCompany";

const ManageCompany = () => {
  const tableHeaders = ["Image", "Name", "Field", "Description", "Rating"];
  const { data: companiesRes, isLoading, isError } = useGetAllCompaniesQuery();
  const [deleteCompany] = useDeleteCompanyMutation();
  const companies = companiesRes?.companies || [];
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);
  const [editCompanyIndex, setEditCompanyIndex] = useState(null);

  const toggleForm = (index = null) => {
    setEditCompanyIndex(index);
    setShowAddCompanyForm(!showAddCompanyForm);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      await deleteCompany(id);
    }
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
                      className="px-6 py-3 text-left text-md font-medium text-[#8392a8] uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {companies.map((company, index) => (
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
          editCompany={editCompanyIndex !== null ? companies[editCompanyIndex] : null}
          refetch={() => setEditCompanyIndex(null)}
        />
      )}
    </div>
  );
};

export default ManageCompany;
