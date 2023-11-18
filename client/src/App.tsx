import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./admin/AdminPage";

function App() {
  return (
    <div className="App">
      <AdminPage />
      <ToastContainer />
    </div>
  );
}

export default App;
