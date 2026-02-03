import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChooseBackend from "./components/ChooseBackend";
import LoginFireBase from "./components/LoginFirebase";
import LoginMERN from "./components/LoginMern";
import RegisterFirebase from "./components/RegisterFirebase";
import RegisterMERN from "./components/RegisterMERN";
import DashboardMERN from "./components/DashboardMERN";
import DashboardFirebase from "./components/DashboardFirebase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseBackend />} />
        <Route path="/login/firebase" element={<LoginFireBase />} />
        <Route path="/login/mern" element={<LoginMERN />} />
        <Route path="/register/firebase" element={<RegisterFirebase />} />
        <Route path="/register/mern" element={<RegisterMERN />} />
        <Route path="/dashboard/mern" element={<DashboardMERN />} />
        <Route path="/dashboard/firebase" element={<DashboardFirebase />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
