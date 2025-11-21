import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, reset, getUserProfile } from "../features/auth/authSlice";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, profile, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  console.log('User is ', profile)

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
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {user ? (
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="task"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Add Task
              </Link>
              <Link
                to="project"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Add Project
              </Link>
              <Link
                to="projects"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                All Projects
              </Link>
              <Link
                to="scheduler"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Scheduler
              </Link>
              <Link
                to="/kanban"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Kanban
              </Link>
              {profile && profile.role === "admin" && (
                <Link
                  to="/admin/tasks"
                  className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
                >
                  Admin
                </Link>
              )}
              <button
                className="ml-auto bg-white text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 font-semibold py-2 px-6 rounded-full transition-all duration-200"
                type="button"
                onClick={() => onLogout()}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-8 ml-auto">
              <Link
                to="login"
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="register"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-full transition-all duration-200"
              >
                Create an Account
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
