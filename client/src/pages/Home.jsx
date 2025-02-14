import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wifi, Volume2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const navigate = useNavigate(); // Now inside the Home component
  const savedSession = localStorage.getItem("userSession");

  return (
    <div className="relative">
      <AnimatedBackground />
      <Navbar />
      <div className="min-h-screen text-white">
    <HeroSection navigate={navigate} savedSession={savedSession} /> {/* Pass navigate as a prop */}
        <FeaturesSection />
        <StatsSection />
        <CTASection navigate={navigate} savedSession={savedSession}/> {/* Pass navigate as a prop */}
      </div>
    </div>
  );
};

const AnimatedBackground = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10">
    <div className="absolute inset-0 bg-[#131315]" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#c4e45615] to-transparent" />
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[#c4e456] rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>
);

const HeroSection = ({ navigate ,savedSession}) => {
  // Receive navigate as a prop
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (savedSession) {
      // User is logged in, navigate to dashboard or wherever appropriate
      navigate("/dashboard/feature2"); // Or navigate to a different route
    } else {
      // User is not logged in, navigate to signin
      navigate("/signin");
    }
  };
  return (
    <motion.section
      className="container mx-auto px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="flex flex-col lg:flex-row items-center gap-12 relative">
        <div className="lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-4 py-1 bg-[#c4e45620] text-[#c4e456] rounded-full text-sm font-medium flex items-center gap-2">
                <Sparkles size={14} />
                AI-Powered Creation
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Create Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#c4e456] to-[#98ff98]">
                AI Podcasts
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Transform your ideas into engaging podcasts effortlessly. Let AI
              handle the technical stuff while you focus on storytelling.
            </p>
            <div className="flex gap-4">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-[#c4e456] to-[#98ff98] rounded-lg overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => (handleClick())}
              >
                <span className="relative z-10 text-[#131315] font-semibold flex items-center gap-2">
                  Start Creating
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "100%" }}
                  animate={{ x: isHovered ? "0%" : "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2 }}
                />
              </button>
              <button className="px-8 py-4 border border-[#c4e456] text-[#c4e456] rounded-lg hover:bg-[#c4e45620] transition-colors" onClick={() => (savedSession ? navigate("/dashboard/feature1") : navigate("/signin"))}>
                Start Listening ...
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <AudioWaveform />
          <FloatingElements />
        </div>
      </div>
    </motion.section>
  );
};

const AudioWaveform = () => {
  const generateWaveform = (count) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      // Ensure height is always positive.  Take the absolute value.
      const height = Math.abs(Math.sin(i * 0.5) * 20 + Math.random() * 30);
      points.push({
        height: height, // Store the positive height
        delay: i * 0.05,
      });
    }
    return points;
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-transparent " />

      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c4e456" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#c4e456" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g transform="translate(0, 100)">
          {generateWaveform(40).map((point, i) => (
            <motion.g key={i}>
              <motion.rect
                x={i * 10}
                y={-point.height / 2}
                width="4"
                height={point.height}
                fill="url(#waveGradient)"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: point.delay,
                  ease: "easeInOut",
                }}
                rx="2"
              />

              <motion.circle
                cx={i * 10 + 2}
                cy="0"
                r="3"
                fill="#c4e456"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: point.delay,
                  ease: "easeInOut",
                }}
                filter="blur(3px)"
              />
            </motion.g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const FloatingElements = () => {
  const icons = [
    { icon: "🎤", size: "text-4xl", color: "#c4e456", top: "5%", left: "15%" },
    { icon: "🎵", size: "text-3xl", color: "#98ff98", top: "85%", left: "70%" },
    { icon: "🎼", size: "text-3xl", color: "#c4e456", top: "75%", left: "25%" },
    { icon: "⭐", size: "text-2xl", color: "#ffffff", top: "10%", left: "80%" },
    { icon: "🎙️", size: "text-4xl", color: "#c4e456", top: "70%", left: "85%" },
    { icon: "🎧", size: "text-3xl", color: "#98ff98", top: "30%", left: "50%" },
    { icon: "🎶", size: "text-2xl", color: "#ffffff", top: "80%", left: "40%" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size}`}
          style={{
            top: `${item.top}`,
            left: `${item.left}`,
            color: item.color, // Added color to the style
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 0px transparent)",
                `drop-shadow(0 0 10px ${item.color})`,
                "drop-shadow(0 0 0px transparent)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const FeaturesSection = () => (
  <motion.section
    className="container mx-auto px-6 py-20"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
  >
    <h2 className="text-4xl font-bold mb-12 text-center text-white">
      Why Choose Wave?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard
        icon="🎙️"
        title="Easy Podcast Creation"
        description="Create and manage multiple podcasts and episodes from one intuitive dashboard."
      />
      <FeatureCard
        icon="📖"
        title="AI Script Generation"
        description="Generate engaging scripts with our advanced AI writing assistant."
      />
      <FeatureCard
        icon="🤖"
        title="Lifelike Voices"
        description="Convert your scripts into natural-sounding speech with AI voice synthesis."
      />
      <FeatureCard
        icon="▶️"
        title="Multi-Character Support"
        description="Bring your stories to life with multiple AI voices for different characters."
      />
    </div>
  </motion.section>
);

const FeatureCard = ({ icon, title, description }) => {
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * 30;
    const y = ((clientY - top) / height - 0.5) * 30;

    setStyle({
      transform: `perspective(500px) rotateY(${x}deg) rotateX(${y}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "perspective(500px) rotateY(0) rotateX(0)" });
  };

  return (
    <div
      className="p-8 rounded-2xl bg-[#1a1a1a] transition-all transform hover:scale-110 hover:bg-[#131315] hover:shadow-xl hover:shadow-[#c4e45633] text-white"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-5xl mb-5 transition-transform duration-300 hover:rotate-[10deg]">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 hover:text-[#c4e456]">
        {title}
      </h3>
      <p className="text-lg text-gray-400">{description}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      value: "50K+",
      label: "Active Creators",
      icon: <Volume2 className="w-8 h-8" />, // Increased icon size
    },
    {
      value: "1M+",
      label: "Episodes Created",
      icon: <Wifi className="w-8 h-8" />, // Increased icon size
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: <Sparkles className="w-8 h-8" />, // Increased icon size
    },
  ];

  return (
    <motion.section
      className="container mx-auto px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-4xl font-bold mb-12 text-center text-white">
        Our Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl bg-[#1a1a1a] transition-all transform hover:scale-105 hover:bg-[#131315] hover:shadow-lg hover:shadow-[#c4e45633] text-white flex flex-col items-center justify-center"
            whileHover={{ y: -5 }}
          >
            <div className="text-[#c4e456] text-5xl mb-4">{stat.icon}</div>
            <div className="text-5xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-400 text-xl">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const CTASection = ({ navigate ,savedSession }) => (

  <motion.section
    className="container mx-auto px-6 py-20"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
  >
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#c4e456] to-[#98ff98] p-12 text-center">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #ffffff 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #ffffff 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <div className="relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#131315] mb-6">
          Ready to Start Your Podcast Journey?
        </h2>
        <p className="text-[#131315] text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already using Wave to bring their
          podcast ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-[#131315] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
            onClick={() => (savedSession ? navigate("/dashboard/feature1") : navigate("/signin"))}
          >
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  </motion.section>
);

export default Home;
