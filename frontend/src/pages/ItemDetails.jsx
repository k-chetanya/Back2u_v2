import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getItemById,
  updateItemById,
  resolveItemById,
} from "../api/item.api";

import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEdit, FaSave, FaTimes, FaCheckCircle, FaMapMarkerAlt, FaTag, FaUser, FaCalendarAlt, FaEnvelope, FaArrowLeft, FaImage } from "react-icons/fa";

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  /* ================= FETCH ITEM ================= */
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await getItemById(id);

        setItem(res.data.item);
        setFormData({
          title: res.data.item.title,
          description: res.data.item.description,
          category: res.data.item.category,
          location: res.data.item.location,
        });
      } catch (error) {
        toast.error("Failed to load item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  /* ================= UPDATE ITEM ================= */
  const updateHandler = async () => {
    try {
      const res = await updateItemById(item._id, formData);

      if (res.data.success) {
        toast.success("Item updated successfully");
        setItem(res.data.item);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  /* ================= RESOLVE ITEM ================= */
  const resolveHandler = async () => {
    try {
      const res = await resolveItemById(item._id);

      if (res.data.success) {
        toast.success(
          `Item marked as ${item.isResolved ? "active" : "resolved"}`
        );
        setItem(res.data.item);
      }
    } catch (error) {
      toast.error("Failed to update item status");
    }
  };
   

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-400">Loading item details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!item) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Item not found</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );

  const isOwner = user && item.user?._id === user._id;
  const itemTypeColor = item.type === "lost" ? "from-orange-400 to-amber-400" : "from-green-400 to-emerald-400";

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to={`/${item.type === "lost" ? "lost" : "found"}`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft />
            Back to {item.type === "lost" ? "Lost Items" : "Found Items"}
          </Link>

          {/* Main Content */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Image Section */}
            <div className="relative h-96 bg-gradient-to-r from-gray-800 to-zinc-900 overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaImage className="text-6xl text-zinc-700" />
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.isResolved
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : item.type === "lost" 
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                }`}>
                  {item.isResolved ? "✓ Resolved" : item.type === "lost" ? "🔍 Lost" : "📦 Found"}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Title Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                {isEditing ? (
                  <input
                    className="text-3xl font-bold bg-gray-800 border border-zinc-700 rounded-lg px-4 py-3 w-full md:w-auto md:flex-1 mr-4 text-white focus:outline-none focus:border-blue-500"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
                    {item.title}
                    <span className={`block text-lg font-normal mt-1 bg-gradient-to-r ${itemTypeColor} bg-clip-text text-transparent`}>
                      {item.type === "lost" ? "Lost Item" : "Found Item"}
                    </span>
                  </h1>
                )}

                {/* Owner Actions */}
                {isOwner && (
                  <div className="flex gap-3">
                    {!item.isResolved && (
                      <button
                        onClick={resolveHandler}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all font-medium"
                      >
                        <FaCheckCircle />
                        {item.isResolved ? "Mark Active" : "Mark Resolved"}
                      </button>
                    )}

                    {isEditing ? (
                      <>
                        <button
                          onClick={updateHandler}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-medium"
                        >
                          <FaSave />
                          Save
                        </button>

                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-700 to-zinc-700 rounded-lg hover:from-gray-600 hover:to-zinc-600 transition-all font-medium"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all font-medium"
                      >
                        <FaEdit />
                        Edit
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">Description</h3>
                {isEditing ? (
                  <textarea
                    className="w-full bg-gray-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                ) : (
                  <div className="bg-gray-800/50 border border-zinc-700 rounded-lg p-6">
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Category */}
                <div className="bg-gray-800/30 border border-zinc-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
                      <FaTag className="text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold">Category</h4>
                  </div>
                  {isEditing ? (
                    <select
                      className="w-full bg-gray-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="electronics">📱 Electronics</option>
                      <option value="documents">📄 Documents</option>
                      <option value="accessories">🔑 Keys & Accessories</option>
                      <option value="wallet">💰 Wallet & Cards</option>
                      <option value="pets">🐾 Pets</option>
                      <option value="clothing">👕 Clothing</option>
                      <option value="others">📦 Others</option>
                    </select>
                  ) : (
                    <p className="text-gray-300 text-lg capitalize">{item.category}</p>
                  )}
                </div>

                {/* Location */}
                <div className="bg-gray-800/30 border border-zinc-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orange-600/20 to-amber-600/20">
                      <FaMapMarkerAlt className="text-orange-400" />
                    </div>
                    <h4 className="text-lg font-semibold">Location</h4>
                  </div>
                  {isEditing ? (
                    <input
                      className="w-full bg-gray-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  ) : (
                    <p className="text-gray-300 text-lg">{item.location}</p>
                  )}
                </div>

                {/* Posted By */}
                <div className="bg-gray-800/30 border border-zinc-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20">
                      <FaUser className="text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold">Posted By</h4>
                  </div>
                  <p className="text-gray-300 text-lg">
                    {item.user?.firstName} {item.user?.lastName}
                  </p>
                </div>

                {/* Date */}
                <div className="bg-gray-800/30 border border-zinc-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20">
                      <FaCalendarAlt className="text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold">Date Reported</h4>
                  </div>
                  <p className="text-gray-300 text-lg">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Contact CTA */}
              {!item.isResolved && item.user?.email && (
                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <a
                    href={`mailto:${item.user.email}?subject=Regarding your ${item.type} item - ${item.title}`}
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all font-medium shadow-lg shadow-blue-500/20"
                  >
                    <FaEnvelope />
                    Contact {item.type === "lost" ? "Owner" : "Finder"} via Email
                  </a>
                  <p className="text-sm text-zinc-400 mt-3">
                    Send an email to discuss about this {item.type} item
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ItemDetails;