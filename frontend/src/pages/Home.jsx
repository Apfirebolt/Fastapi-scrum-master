import React from "react";
import { motion } from "framer-motion";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { useSelector } from "react-redux";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6"
            animate={{ y: [40, 0], opacity: [0, 1] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            initial={{ opacity: 0, y: 40 }}
          >
            Supercharge your workflow with
            <span className="block text-purple-700 mt-2">
              React & FastAPI Kanban
            </span>
          </motion.h1>

          {profile && (
            <motion.h2
              className="text-2xl font-semibold text-blue-700 mb-4"
              animate={{ opacity: [0, 1], x: [-30, 0] }}
              transition={{ delay: 0.5, duration: 0.8 }}
              initial={{ opacity: 0, x: -30 }}
            >
              Welcome back, {profile.username}!
            </motion.h2>
          )}

          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Organize your tasks visually, collaborate with your team, and boost productivity. Drag, drop, and manage your projects with ease.
          </p>
        </div>
        <div className="flex-1 max-w-lg w-full shadow-2xl rounded-xl overflow-hidden">
          <AwesomeSlider bullets={false} organicArrows={true}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Kanban Board Example 1"
                className="object-cover w-full h-72"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Kanban Board Example 2"
                className="object-cover w-full h-72"
              />
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1664461662789-b72903263bad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Kanban Board Example 3"
                className="object-cover w-full h-72"
              />
            </div>
          </AwesomeSlider>
        </div>
      </div>
    </div>
  );
};

export default Home;
