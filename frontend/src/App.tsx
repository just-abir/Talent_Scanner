import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Layouts/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { Hero } from "./Pages/Hero";
import { ProtectedRoute } from "./ProtectedRoute";
import InterviewReport from "./Pages/InterviewReport";
import Compare from "./Pages/Compare";
import CompareReport from "./Pages/CompareReport";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 antialiased  overflow-x-hidden">
      {location.pathname !== "/" && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/interview/:id" element={<InterviewReport />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/compare/:id" element={<CompareReport />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
