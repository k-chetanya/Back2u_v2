import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDashboardStats } from "../api/item.api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChartLine, FaCheckCircle, FaExclamationCircle, FaPlusCircle, FaSearch, FaList, FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ totalItems: 0, resolvedItems: 0, activeItems: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getDashboardStats();
      setStats(
        res.data.stats || {
          totalItems: 0,
          resolvedItems: 0,
          activeItems: 0,
        }
      );
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      setError("Failed to load dashboard data");
      setStats({ totalItems: 0, resolvedItems: 0, activeItems: 0 });
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  const resolutionRate = stats.totalItems > 0 
    ? Math.round((stats.resolvedItems / stats.totalItems) * 100) 
    : 0;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-zinc-400">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome, <span className="text-cyan-400">{user?.firstName}</span>
            </h1>
            <p className="text-zinc-400">Your activity overview</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-600/20">
                  <FaChartLine className="text-blue-400" />
                </div>
                <div className="text-2xl font-bold">{stats.totalItems}</div>
              </div>
              <div className="text-zinc-400">Total Items</div>
            </div>

            <div className="bg-gray-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-600/20">
                  <FaCheckCircle className="text-green-400" />
                </div>
                <div className="text-2xl font-bold">{stats.resolvedItems}</div>
              </div>
              <div className="text-zinc-400">Resolved</div>
              {resolutionRate > 0 && (
                <div className="text-sm text-green-400 mt-2">+{resolutionRate}% success rate</div>
              )}
            </div>

            <div className="bg-gray-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-600/20">
                  <FaExclamationCircle className="text-orange-400" />
                </div>
                <div className="text-2xl font-bold">{stats.activeItems}</div>
              </div>
              <div className="text-zinc-400">Active Items</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/report"
                className="bg-gray-900 border border-zinc-800 rounded-xl p-5 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-600/20">
                    <FaPlusCircle className="text-blue-400" />
                  </div>
                  <FaArrowRight className="text-zinc-500 ml-auto" />
                </div>
                <h3 className="font-semibold mb-1">Report Lost Item</h3>
                <p className="text-sm text-zinc-400">Report something you've lost</p>
              </Link>

              <Link
                to="/report"
                className="bg-gray-900 border border-zinc-800 rounded-xl p-5 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-600/20">
                    <FaSearch className="text-purple-400" />
                  </div>
                  <FaArrowRight className="text-zinc-500 ml-auto" />
                </div>
                <h3 className="font-semibold mb-1">Report Found Item</h3>
                <p className="text-sm text-zinc-400">Report something you've found</p>
              </Link>

              {/* <Link
                to="/my-items"
                className="bg-gray-900 border border-zinc-800 rounded-xl p-5 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-800">
                    <FaList className="text-zinc-400" />
                  </div>
                  <FaArrowRight className="text-zinc-500 ml-auto" />
                </div>
                <h3 className="font-semibold mb-1">My Items</h3>
                <p className="text-sm text-zinc-400">View all your reported items</p>
              </Link> */}
            </div>
          </div>

          {/* Resolution Progress */}
          <div className="bg-gray-900 border border-zinc-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Resolution Progress</h2>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-300">Resolved Items</span>
                  <span className="font-medium">{stats.resolvedItems} / {stats.totalItems}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-2.5 rounded-full"
                    style={{ width: `${resolutionRate}%` }}
                  ></div>
                </div>
                <div className="text-sm text-zinc-400 mt-1">{resolutionRate}% completed</div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-zinc-300">Active Items</span>
                  <span className="font-medium">{stats.activeItems} / {stats.totalItems}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-orange-600 to-amber-600 h-2.5 rounded-full"
                    style={{ width: `${100 - resolutionRate}%` }}
                  ></div>
                </div>
                <div className="text-sm text-zinc-400 mt-1">{100 - resolutionRate}% pending</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          {stats.totalItems === 0 && (
            <div className="text-center border-2 border-dashed border-zinc-800 rounded-xl p-8">
              <div className="inline-flex p-4 rounded-xl bg-gray-800 mb-4">
                <FaPlusCircle className="text-2xl text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No items reported yet</h3>
              <p className="text-zinc-400 mb-6">Start by reporting your first item</p>
              <Link
                to="/report"
                className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all font-medium"
              >
                Report Your First Item
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;