import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomRoutes from "./Routes";

function App() {
  return (
    <div>
      <ToastContainer />
      <CustomRoutes />
    </div>
  );
}

export default App;
