import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Home = () => {
  
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-zinc-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          {/* Glowing Title */}
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Lost Something?
            <br />
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Find It Here.
              </span>
              <span className="absolute inset-0 text-orange-500 blur-lg animate-pulse">
                Find It Here.
              </span>
            </span>
          </h1>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            A centralized platform to report, track, and recover lost and found
            items with cutting-edge <span className="text-cyan-400 font-semibold">glowing tech</span> and
            <span className="text-green-400 font-semibold"> community power</span>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to={user ? "/lost" : "/login"}
              className="relative px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl 
                         hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
                         shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
                         group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="flex items-center justify-center gap-2">
                🔍 View Lost Items
              </span>
            </Link>
            
            <Link
              to={user ? "/report" : "/register"}
              className="relative px-10 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-xl 
                         hover:from-orange-500 hover:to-amber-500 transition-all duration-300
                         shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
                         group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="flex items-center justify-center gap-2">
                📝 Report Item
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
            <Stat number="500+" label="Items Found" color="blue" />
            <Stat number="98%" label="Success Rate" color="green" />
            <Stat number="24/7" label="Active Support" color="orange" />
            <Stat number="100+" label="Communities" color="cyan" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Use <span className="text-transparent bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text">LostFound</span>?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Powered by advanced technology and a passionate community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon="⚡"
              desc="Report lost or found items in seconds with a simple and intuitive form."
              title="Quick Reporting"
              color="orange"
            />
            <Feature
              icon="🔒"
              desc="Your data is protected with secure authentication and standard privacy practices."
              title="Secure & Verified"
              color="blue"
            />
            <Feature
              icon="🌐"
              title="Community Driven"
              desc="Global network helping return lost items to their owners."
              color="green"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            How It <span className="text-cyan-400">Works</span>
          </h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <Step
                number="01"
                title="Report Item"
                desc="Submit details with photos and location"
                color="orange"
              />
              <Step
                number="02"
                title="Match Found"
                desc="Users can browse lost and found items posted by others"
                color="cyan"
              />
              <Step
                number="03"
                title="Reunite"
                desc="Secure handover with verification"
                color="green"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white text-center overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8">
            Help Someone.{" "}
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text">
              Get Help.
            </span>
          </h2>
          <p className="text-xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands who are making the world a better place, one found item at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/register"
              className="relative px-12 py-4 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-bold rounded-xl
                         hover:from-green-500 hover:to-cyan-500 transition-all duration-300
                         shadow-lg shadow-green-500/30 hover:shadow-green-500/50
                         group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
              <span className="flex items-center justify-center gap-3">
                🚀 Get Started Free
              </span>
            </Link>
            
            <Link
              to="/about"
              className="px-10 py-4 border-2 border-zinc-700 text-zinc-300 font-bold rounded-xl
                         hover:border-zinc-600 hover:text-white transition-all duration-300
                         hover:shadow-lg hover:shadow-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const Feature = ({ icon, title, desc, color }) => {
  const colorClasses = {
    orange: "from-orange-500 to-amber-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] group">
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} mb-6`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
      <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${colorClasses[color]} transition-all duration-500 mt-6`}></div>
    </div>
  );
};

const Step = ({ number, title, desc, color }) => {
  const colorClasses = {
    orange: "bg-gradient-to-br from-orange-500 to-amber-500",
    cyan: "bg-gradient-to-br from-cyan-500 to-blue-500",
    green: "bg-gradient-to-br from-green-500 to-emerald-500",
  };

  return (
    <div className="text-center">
      <div className={`${colorClasses[color]} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-current/30`}>
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400">{desc}</p>
    </div>
  );
};

const Stat = ({ number, label, color }) => {
  const colorClasses = {
    orange: "text-orange-400",
    blue: "text-blue-400",
    green: "text-green-400",
    cyan: "text-cyan-400",
  };

  return (
    <div className="text-center p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800">
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-2`}>{number}</div>
      <div className="text-zinc-400 text-sm font-medium">{label}</div>
    </div>
  );
};

export default Home;