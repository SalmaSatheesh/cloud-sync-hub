import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import MyDrive from "./components/MyDrive";
import Shared from "./components/Shared";
import Recent from "./components/Recent";
import Trash from "./components/Trash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-drive" element={<MyDrive />} />
        <Route path="/shared" element={<Shared />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Router>
  );
}

export default App;
