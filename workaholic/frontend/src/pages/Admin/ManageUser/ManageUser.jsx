import { useGetAllUsersQuery, useDeleteUserMutation } from "../../../redux/rtk/user.service";
import UserTable from "../../../components/Admin/Tables/UserTable";
import { useState } from "react";
import { Pagination } from "antd";

const ManageUser = () => {
  const tableHeaders = ["Id", "Avatar", "Name", "Email"];
  const { data: userRes, isLoading, isError } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting, isError: deleteError }] = useDeleteUserMutation();

  const users = userRes?.users || [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentData = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
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
              {currentData.map((user, index) => (
                <UserTable key={index} rowValue={user} onDelete={() => handleDelete(user.id)} />
              ))}
            </tbody>
          </table>
        </div>
        \
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Optional: Display delete error */}
      {deleteError && <div className="text-red-500">Failed to delete user!</div>}
      {isDeleting && <div className="text-blue-500">Deleting user...</div>}
    </div>
  );
};

export default ManageUser;
