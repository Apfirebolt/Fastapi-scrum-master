import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { profile, user } = useSelector((state) => state.auth);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Interactive Kanban Workspaces",
    },
    {
      url: "https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Real-time Sprint Planning & Velocity",
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1664461662789-b72903263bad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "End-to-End Task Organization",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-100/50 via-indigo-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-6 text-center lg:text-left space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* User Greeting / Release Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              {profile ? (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  Welcome back, {profile.firstName || profile.username || "Team Member"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  🚀 FastAPI & React Powered Kanban 2.0
                </span>
              )}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            >
              Streamline sprints with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                intelligent agile workflows
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Organize sprint backlogs, track real-time delivery status, and coordinate across cross-functional engineering teams with zero friction.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              {user ? (
                <>
                  <Link
                    to="/kanban"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98]"
                  >
                    <span>Open Kanban Board</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/projects"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all"
                  >
                    View All Projects
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98]"
                  >
                    <span>Start Free Sprint</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>

            {/* Micro Feature List */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left"
            >
              <div>
                <p className="text-xl font-bold text-slate-900">99.9%</p>
                <p className="text-xs text-slate-500 font-medium">Uptime Reliability</p>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">&lt;50ms</p>
                <p className="text-xs text-slate-500 font-medium">FastAPI Latency</p>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">Infinite</p>
                <p className="text-xs text-slate-500 font-medium">Sprint Boards</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Slider Showcase */}
          <motion.div
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl bg-white p-2 sm:p-3 shadow-2xl shadow-slate-300/60 border border-slate-200/90">
              
              {/* Browser/Window Mockup Top Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded border border-slate-100">
                  fastapi-scrum-master.dev
                </span>
                <div className="w-8" />
              </div>

              {/* Slider Container */}
              <div className="rounded-xl overflow-hidden [&_.awssld]:!h-72 [&_.awssld]:sm:!h-96 [&_.awssld\_\_bullets]:!hidden">
                <AwesomeSlider organicArrows={true}>
                  {slides.map((slide, index) => (
                    <div key={index} className="relative w-full h-full">
                      <img
                        src={slide.url}
                        alt={slide.caption}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 text-left">
                        <p className="text-xs font-semibold text-white tracking-wide">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </AwesomeSlider>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Home;