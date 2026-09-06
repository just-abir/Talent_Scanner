import { Route, Routes } from "react-router-dom";
import Navbar from "./Layouts/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Hero from "./Pages/Hero";
import { ProtectedRoute } from "./ProtectedRoute";
import InterviewReport from "./Pages/InterviewReport";

function App() {
  return (
    <div className="min-h-screen ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/interviewReport" element={<InterviewReport />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
