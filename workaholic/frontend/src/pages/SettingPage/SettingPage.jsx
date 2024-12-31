import { useContext, useEffect, useState } from "react";
// import { Camera } from "lucide-react";
import { FaCamera } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthProvider";
import { useUpdateUserMutation } from "../../redux/rtk/user.service";
import toast from "react-hot-toast";

export default function UserSettingsForm() {
  const [formData, setFormData] = useState({
    userName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: "",
  });
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      const payload = {
        user_id: userData.id,
        userName: formData.userName,
        avatar: formData.avatar,
      };
      if (formData.currentPassword && formData.newPassword) {
        payload["oldPassword"] = formData.currentPassword;
        payload["newPassword"] = formData.newPassword;
      }
      await updateUser({
        id: userData.id,
        body: payload,
      }).unwrap();
      toast.success("Settings updated successfully!");
      setSuccess("Settings updated successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      if (err?.data?.message) {
        toast.error(err?.data?.message);
      }
      setError(err?.message || err?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        userName: userData.user_name,
        avatar: userData.avatar,
      });
    }
  }, [userData]);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Settings</h2>

      {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-[4px]">{error}</div>}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-[4px]">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Profile Picture</label>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                  <FaCamera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-[4px] bg-gray-200 text-black"
              placeholder="Enter avatar url here"
            />
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="userName" className="block text-sm font-medium text-black">
            Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-[4px] bg-gray-200 text-black"
            placeholder="Enter new username"
          />
        </div>

        {/* Password Change Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-black">Change Password</h3>

          <div className="space-y-2">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-black">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              placeholder="Enter current password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-[4px] text-black bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-black ">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-[4px] text-black bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-[4px] text-black bg-gray-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-[4px] hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Updating..." : "Update Settings"}
        </button>
      </form>
    </div>
  );
}
