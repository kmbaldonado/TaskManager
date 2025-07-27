import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", new URLSearchParams(form));
      login(res.data.access_token);
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-200">
      <div className="max-w-xl relative bg-dotted p-8 rounded-lg shadow-lg">
        <img
            src="/flower-exclamation-point.png"
            alt="Overlay"
            className="absolute -top-3 left-45 -translate-x-1/2 w-[30%] h-auto pointer-events-none"
        />
        <img
            src="/encircle.png"
            alt="Overlay"
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-auto h-[55%] pointer-events-none"
        />
        <h2 className="text-3xl font-bold text-center mb-2 text-slate-800">TO-DO List</h2>

        {error && <p className="text-red-500 mb-3 text-sm text-center italic">{error}</p>}
        
        <div className="mb-10"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-3 py-2 border-b-2 border-black rounded-none bg-gray-100 focus:outline-none"
            placeholder="Email"
            name="username"
            type="email"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="w-full px-3 py-2 border-b-2 border-black rounded-none bg-gray-100 focus:outline-none"
            placeholder="Password"
            name="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-[30%] text-center bg-emerald-400 text-white py-2 rounded hover:bg-emerald-500 transition font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4 ">
          No account yet?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here!
          </Link>
        </p>
      </div>
    </div>
  );
}
