import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ToastContainer } from 'react-toastify';

import Footer from "./components/Footer";
import Header from "./components/Header";


const App = () => {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;