import { useState } from "react";
import { createItem } from "../api/item.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUpload, FaCamera, FaMapMarkerAlt, FaTag, FaPen, FaClipboard, FaPlus } from "react-icons/fa";

const ReportItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "lost",
    category: "electronics",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    const res = await createItem(formData);

    if (res.data.success) {
      toast.success(
        `Item ${form.type === "lost" ? "reported as lost" : "reported as found"} successfully`
      );
      navigate(form.type === "lost" ? "/lost" : "/found");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to report item. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">
              Report <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">Item</span>
            </h1>
            <p className="text-zinc-400">Help reunite lost items with their owners</p>
          </div>

          {/* Report Form */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <form onSubmit={submitHandler} className="space-y-6">
                {/* Item Type Toggle */}
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setForm({...form, type: "lost"})}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      form.type === "lost" 
                        ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/20"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <FaTag />
                    Lost Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({...form, type: "found"})}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      form.type === "found" 
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    <FaClipboard />
                    Found Item
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FaPen className="text-blue-400" />
                      Item Title
                    </div>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="What did you lose/find? e.g., iPhone 12, Wallet, Keys"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FaClipboard className="text-cyan-400" />
                      Description
                    </div>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Provide detailed description including color, brand, distinguishing features, etc."
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    >
                      <option value="electronics">📱 Electronics</option>
                      <option value="documents">📄 Documents</option>
                      <option value="accessories">🔑 Keys & Accessories</option>
                      <option value="others">📦 Others</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-400" />
                        Location
                      </div>
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Where was it lost/found? e.g., Main Building, Library, Parking Lot"
                      value={form.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FaCamera className="text-purple-400" />
                      Upload Image
                    </div>
                  </label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-zinc-600 transition-colors">
                    <FaUpload className="text-3xl text-zinc-500 mx-auto mb-3" />
                    <p className="text-zinc-400 mb-3">Drag & drop or click to upload image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all cursor-pointer"
                    >
                      Choose File
                    </label>
                    {form.image && (
                      <p className="text-green-400 mt-3 text-sm">
                        ✓ {form.image.name}
                      </p>
                    )}
                    <p className="text-xs text-zinc-500 mt-3">Max file size: 5MB</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaPlus className="group-hover:scale-110 transition-transform" />
                        {form.type === "lost" ? "Report Lost Item" : "Report Found Item"}
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-900/50 to-black/50 border border-zinc-800 rounded-xl">
            <h3 className="text-lg font-semibold mb-3 text-cyan-400">💡 Tips for better results:</h3>
            <ul className="text-sm text-zinc-400 space-y-2">
              <li>• Be specific about the location and time</li>
              <li>• Include clear photos from multiple angles</li>
              <li>• Mention any unique identifiers or serial numbers</li>
              <li>• Provide contact information where you can be reached</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ReportItem;