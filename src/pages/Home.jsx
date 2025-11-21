import React from "react";
import { motion } from "framer-motion";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { useSelector } from "react-redux";

const Home = () => {
  const { profile } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <motion.h1
            className="text-3xl font-extrabold sm:text-5xl"
            animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
            transition={{
              duration: 5,
              delay: 0.3,
              ease: [0.5, 0.71, 1, 1.5],
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.2 }}
          >
            Animation made easy with Framer Motion
            <strong className="font-extrabold text-red-700 sm:block">
              React and FAST API.
            </strong>
          </motion.h1>

          {profile && (
            <h1 className="text-xl my-4 font-extrabold sm:text-2xl">
              Welcome to Kanban Board,
              <strong className="font-extrabold text-blue-700 sm:block">
                {profile.username}
              </strong>
            </h1>
          )}

          <p className="my-4 sm:text-xl sm:leading-relaxed">
            A simple Jira clone - create tasks and arrange them through drag and
            drop
          </p>

          <AwesomeSlider>
            <div>
              <img
                src="https://images.unsplash.com/photo-1664575262619-b28fef7a40a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2932&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1664575197229-3bbebc281874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                alt=""
              />
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1664461662789-b72903263bad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80"
                alt=""
              />
            </div>
          </AwesomeSlider>
        </div>
      </div>
    </div>
  );
};

export default Home;
