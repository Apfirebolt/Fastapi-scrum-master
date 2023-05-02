import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import AddTaskScreen from "./pages/AddTask";
import KanbanScreen from "./pages/Kanban";
import SchedulerScreen from "./pages/Scheduler";
import TaskDetailScreen from "./pages/TaskDetail";
import TasksAdminPage from "./pages/admin/AllTasks";
import UsersAdminPage from "./pages/admin/AllUsers";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
        <Route path="/scheduler" element={<SchedulerScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/task" element={<PrivateRoute />}>
          <Route path="/task" element={<AddTaskScreen />} />
        </Route>
        <Route path="/kanban" element={<PrivateRoute />}>
          <Route path="/kanban" element={<KanbanScreen />} />
        </Route>
        <Route path='/task/:taskId' element={<PrivateRoute />}>
          <Route path='/task/:taskId' element={<TaskDetailScreen />} />
        </Route>
        <Route path='/admin/tasks' element={<AdminRoute />}>
          <Route path='/admin/tasks' element={<TasksAdminPage />} />
        </Route>
        <Route path='/admin/users' element={<AdminRoute />}>
          <Route path='/admin/users' element={<UsersAdminPage />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
