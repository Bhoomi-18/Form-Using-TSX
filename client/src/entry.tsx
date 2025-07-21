import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}