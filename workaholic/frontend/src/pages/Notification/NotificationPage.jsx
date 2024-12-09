import React, { useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useCheckLoginQuery } from "../../redux/rtk/user.service";
import { useDeleteNotificationMutation, useGetNotificationsQuery } from "../../redux/rtk/notification.service";



const NotificationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { data: user, isSuccess: isUserFetched } = useCheckLoginQuery();
  const user_id = isUserFetched && user ? user.user.id : null;
//   console.log('user',user );
  const is_global = !user_id;

  const { data: notifications = [], refetch } = useGetNotificationsQuery({ user_id, is_global });
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleDeleteNotification = async (id) => {
    try {
      await deleteNotification(id).unwrap();
      refetch();
      setPopupMessage("Notification deleted successfully.");
      setShowPopup(true);
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const filteredNotifications = notifications.filter((notification) =>
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Notification Listings</h1>
      </div>
      <div>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">No notifications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{notification.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{new Date(notification.date).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-lg font-medium text-gray-800">{popupMessage}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
