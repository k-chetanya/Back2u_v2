import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ItemCard = ({ item, isDashboard }) => {
  const resolveItem = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/item/resolve/${item._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Item resolved");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to resolve item");
    }
  };

  return (
    <div className="border rounded-xl shadow overflow-hidden">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{item.title}</h3>

          <span
            className={`text-xs px-2 py-1 rounded ${
              item.isResolved
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.isResolved ? "Resolved" : "Active"}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          {item.description.slice(0, 80)}...
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
            {item.category}
          </span>

          <Link
            to={`/item/${item._id}`}
            className="text-blue-600 font-semibold"
          >
            View →
          </Link>
        </div>

        {/* DASHBOARD ACTIONS */}
        {isDashboard && !item.isResolved && (
          <div className="mt-4 flex gap-3">
            <Link
              to={`/item/edit/${item._id}`}
              className="text-sm bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </Link>

            <button
              onClick={resolveItem}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded"
            >
              Resolve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
