import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Home";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";
import AddTaskScreen from "./pages/AddTask";
import KanbanScreen from "./pages/Kanban";
import TaskDetailScreen from "./pages/TaskDetail";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} exact />
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
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
