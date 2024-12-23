import { useGetAllUsersQuery } from "../../../redux/rtk/user.service";
import { deleteUser } from "../../../../../backend/src/controllers/authController";
import UserTable from "../../../components/Admin/Tables/UserTable";

const ManageUser = () => {
  const tableHeaders = ["Id", "Avatar", "Name"];
  const { data: userRes, isLoading, isError } = useGetAllUsersQuery();

  const users = userRes?.users || [];
  console.log("user", users);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching companies!</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {/* Main Content */}

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Companies Management</h1>
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
              {users.map((company, index) => (
                <UserTable key={index} rowValue={company} onDelete={() => handleDelete(company.id)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
