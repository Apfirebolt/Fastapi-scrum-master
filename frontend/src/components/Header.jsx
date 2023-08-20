import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, reset, getUserProfile } from "../features/auth/authSlice";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <Loader />;
  }

  const toastMessage = "Logged out successfully";
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const onLogout = () => {
    toast.success(toastMessage, toastOptions);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="relative z-10">
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-gray-900">
          <div className="max-w-7xl mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
            {user ? (
              <div className="flex items-center space-x-6">
                <button
                  className="shadow bg-red-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => onLogout()}
                >
                  Log Out
                </button>
                <Link
                  to="task"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Add Task
                </Link>
                <Link
                  to="project"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Add Project
                </Link>
                <Link
                  to="scheduler"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Scheduler
                </Link>
                <Link
                  to="/kanban"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Kanban
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/admin/tasks"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Admin
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-6">
                  <Link
                    to="login"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="register"
                    className="text-sm font-medium text-white hover:text-gray-100"
                  >
                    Create an Account
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
