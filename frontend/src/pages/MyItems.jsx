import { useEffect, useState } from "react";
import { getMyItems } from "../api/item.api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUser, 
  FaImage, 
  FaArrowRight 
} from "react-icons/fa";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user items
  const fetchMyItems = async () => {
  setLoading(true);
  try {
    const res = await getMyItems();
    if (res.data.success) {
      setItems(res.data.items);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMyItems();
  }, []);

  // Custom ItemCard component
  const ItemCard = ({ item }) => (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-r from-gray-800 to-zinc-900 overflow-hidden">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaImage className="text-4xl text-zinc-700" />
          </div>
        )}

        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
          item.isResolved 
            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
            : "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
        }`}>
          {item.isResolved ? "Resolved" : "Pending"}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-medium">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-cyan-300 transition-colors">
            {item.title}
          </h3>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {item.description}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="line-clamp-1">{item.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaUser className="text-blue-400" />
            <span>Reported by You</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaCalendarAlt className="text-green-400" />
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/item/${item._id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all group"
        >
          <span>View Details</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Items</span>
              </h1>
              <p className="text-zinc-400">Items you have reported</p>
            </div>

            <Link
              to="/report"
              className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all font-medium shadow-lg shadow-orange-500/20"
            >
              <FaImage />
              Report Item
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-zinc-400">Loading your items...</p>
            </div>
          )}

          {/* Items Grid */}
          {!loading && items.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50">
              <div className="inline-flex p-5 rounded-xl bg-gradient-to-r from-gray-800 to-zinc-800 mb-5">
                <FaImage className="text-3xl text-zinc-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">No items reported yet</h3>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                You haven’t reported any items yet. Click below to report your first item.
              </p>
              <Link
                to="/report"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-500 hover:to-amber-500 transition-all font-medium shadow-lg shadow-orange-500/30"
              >
                <FaPlus />
                Report Your Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyItems;
