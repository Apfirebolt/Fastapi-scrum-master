import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />

        {/* Main Content Area: flex-grow ensures footer stays at the bottom */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />

        {/* Global Toast Notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={4}
        />
      </div>
    </Router>
  );
};

export default App;