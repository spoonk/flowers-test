import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "../admin/AdminPage";
import GardenView from "./garden/GardenView";

// @todo: make a hook to load all app state

function App() {
  return (
    <div className="App">
      <AdminPage />
      <ToastContainer />
      <GardenView />
    </div>
  );
}

export default App;
