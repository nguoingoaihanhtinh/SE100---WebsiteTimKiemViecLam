const NotificationCard = ({ notification }) => {
  const { header, content, user_id, is_global, date } = notification;

  return (
    <div className="p-4 border rounded shadow-sm bg-white max-w-md mx-auto">
      <h2 className="text-lg font-bold">{header}</h2>
      <p className="mt-2 text-gray-600">{content}</p>
      <div className="mt-4 text-sm text-gray-500">
        <p>{is_global ? "For Everyone" : `User ID: ${user_id}`}</p>
        <p>Date: {new Date(date).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
