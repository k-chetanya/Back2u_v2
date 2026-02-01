import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateMyProfile } from "../api/user.api";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { FaUser, FaEdit, FaSave, FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: reduxUser } = useSelector((store) => store.auth);
  const [user, setUserState] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    github: ""
  });

const fetchProfile = async () => {
  try {
    const res = await getMyProfile();
    const userData = res.data.user;

    setUserState(userData);
    setFormData({
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      bio: userData.bio || "",
      instagram: userData.instagram || "",
      linkedin: userData.linkedin || "",
      facebook: userData.facebook || "",
      github: userData.github || "",
    });
  } catch {
    toast.error("Failed to load profile");
  }
};

  useEffect(() => {
    if (reduxUser) {
      setUserState(reduxUser);
      setFormData({
        firstName: reduxUser.firstName || "",
        lastName: reduxUser.lastName || "",
        bio: reduxUser.bio || "",
        instagram: reduxUser.instagram || "",
        linkedin: reduxUser.linkedin || "",
        facebook: reduxUser.facebook || "",
        github: reduxUser.github || ""
      });
    } else {
      fetchProfile();
    }
  }, [reduxUser]);

 const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  const submitData = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    submitData.append(key, value);
  });

  if (avatar) submitData.append("avatar", avatar);

  try {
    const res = await updateMyProfile(submitData);
    const updatedUser = res.data.user;

    setUserState(updatedUser);
    dispatch(setUser(updatedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  } catch {
    toast.error("Profile update failed");
  } finally {
    setLoading(false);
  }
};


  if (!user) return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="text-white">Loading profile...</div>
    </div>
  );

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-zinc-900 text-white p-4">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-10 pt-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">Profile</span>
            </h1>
            <p className="text-zinc-400">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="p-8 border-b border-zinc-800">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-full blur opacity-20"></div>
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-gray-800"
                      alt="Profile"
                    />
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <label className="cursor-pointer p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full">
                          <FaEdit className="text-white text-sm" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setAvatar(e.target.files[0])}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                </div>

                {/* Social Links */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    {user.github && (
                      <a href={user.github} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FaGithub className="text-xl" />
                      </a>
                    )}
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FaLinkedin className="text-xl" />
                      </a>
                    )}
                    {user.instagram && (
                      <a href={user.instagram} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FaInstagram className="text-xl" />
                      </a>
                    )}
                    {user.facebook && (
                      <a href={user.facebook} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <FaFacebook className="text-xl" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all font-medium flex items-center gap-2"
                >
                  {isEditing ? <FaSave /> : <FaEdit />}
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={submitHandler} className="p-8">
              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                    <textarea
                      className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.facebook}
                        onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                      <input
                        className="w-full px-4 py-2.5 bg-gray-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About Me</h3>
                    <div className="bg-gray-800/50 border border-zinc-700 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed">
                        {user.bio || "No bio provided yet."}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-800/30 rounded-lg border border-zinc-800">
                      <h4 className="text-sm text-zinc-400 mb-1">Email</h4>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div className="p-4 bg-gray-800/30 rounded-lg border border-zinc-800">
                      <h4 className="text-sm text-zinc-400 mb-1">Full Name</h4>
                      <p className="font-medium">{user.firstName} {user.lastName}</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;