import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login, Register } from "@pages/auth";
import { Home } from "@pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default App;
