import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { loginUser } from "../../api/auth"; // <-- import your API function

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ All fields required check
    if (!input.email || !input.password) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser(input); // <-- using API helper

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-gray-900 border border-zinc-800 rounded-xl shadow-lg">
            {/* Header */}
            <div className="p-6 text-center border-b border-zinc-800">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 mb-3">
                <FaSignInAlt className="text-xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Login</h2>
              <p className="text-sm text-zinc-400 mt-1">Access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Email */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FaEnvelope className="text-base" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white text-base placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                    <FaLock className="text-base scale-90" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 bg-gray-800 border border-zinc-700 rounded-lg text-white text-base placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="text-base" /> : <FaEye className="text-base" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-base font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Register */}
              <div className="text-center mt-6">
                <p className="text-sm text-zinc-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-400 hover:text-blue-300">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
