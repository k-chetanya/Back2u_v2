import { useEffect, useState } from "react";
import { getLostItems } from "../api/item.api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch, FaPlus, FaFilter, FaEye, FaEyeSlash, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaImage, FaArrowRight } from "react-icons/fa";

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [showResolved, setShowResolved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH LOST ITEMS ================= */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getLostItems(category);
      setItems(res.data.items);
    } catch (error) {
      console.error("Failed to fetch lost items", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  /* ================= FILTERED ITEMS ================= */
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesResolved = showResolved ? true : !item.isResolved;

    return matchesSearch && matchesResolved;
  });
  
  // Custom ItemCard component
  const ItemCard = ({ item }) => (
    <div className="group bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
      {/* Image Section */}
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
          {item.isResolved ? "Resolved" : "Lost"}
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
            <span>Reported by {item.reportedBy?.name || "User"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <FaCalendarAlt className="text-green-400" />
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/item/${item._id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all group"
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
                Lost <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Items</span>
              </h1>
              <p className="text-zinc-400">Items reported lost by others in your community</p>
            </div>
            
            <Link
              to="/report"
              className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-medium shadow-lg shadow-blue-500/20"
            >
              <FaPlus />
              Report Lost Item
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-xl p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search items by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Filters Row - Properly aligned */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <div className="flex items-center gap-2">
                    <FaFilter className="text-blue-400" />
                    Category Filter
                  </div>
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">📱 Electronics</option>
                  <option value="documents">📄 Documents</option>
                  <option value="accessories">🔑 Keys & Accessories</option>
                  <option value="wallet">💰 Wallet & Cards</option>
                  <option value="pets">🐾 Pets</option>
                  <option value="clothing">👕 Clothing</option>
                  <option value="others">📦 Others</option>
                </select>
              </div>

              {/* Properly aligned Hide/Show Resolved Button */}
              <div className="flex items-end">
                <button
                  onClick={() => setShowResolved(!showResolved)}
                  className={`flex items-center gap-2 px-6 py-3 h-[52px] rounded-lg transition-all whitespace-nowrap ${
                    showResolved
                      ? "bg-gradient-to-r from-orange-600/20 to-amber-600/20 text-orange-400 border border-orange-500/30"
                      : "bg-gradient-to-r from-gray-800 to-zinc-800 text-gray-300 hover:bg-gray-700 border border-zinc-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {showResolved ? <FaEye className="text-orange-400" /> : <FaEyeSlash className="text-blue-400" />}
                    {showResolved ? "Showing All" : "Hide Resolved"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-zinc-400">Loading lost items...</p>
            </div>
          )}

          {/* Items Grid */}
          {!loading && filteredItems.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50">
              <div className="inline-flex p-5 rounded-xl bg-gradient-to-r from-gray-800 to-zinc-800 mb-5">
                <FaSearch className="text-3xl text-zinc-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">No lost items yet</h3>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                {searchTerm || category !== ""
                  ? "No items match your search criteria. Try different filters or search terms."
                  : "Be the first to report a lost item or help someone find their belongings!"}
              </p>
              <Link
                to="/report"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all font-medium shadow-lg shadow-blue-500/30"
              >
                <FaPlus />
                Report Your Lost Item
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
              
              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-sm text-zinc-400">
                  Showing <span className="text-white font-medium">{filteredItems.length}</span> of{" "}
                  <span className="text-white font-medium">{items.length}</span> lost items
                  {searchTerm && " matching your search"}
                  {category && ` in ${category} category`}
                  {!showResolved && " (excluding resolved items)"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LostItems;