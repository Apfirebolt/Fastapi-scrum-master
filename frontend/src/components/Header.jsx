import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            
            <div className="flex items-center space-x-6">
              <Link to='login' className="text-sm font-medium text-white hover:text-gray-100">Sign In</Link>
              <Link to='register' className="text-sm font-medium text-white hover:text-gray-100">Create an Account</Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
