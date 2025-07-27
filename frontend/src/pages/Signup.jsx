import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await API.post("/auth/signup", {
        email: form.email,
        password: form.password,
      });
      login(res.data.access_token);
      navigate("/tasks");
    } catch (err) {
        if (err.response?.status === 400) {
            alert(err.response.data.detail);
        } else {
            alert("Signup failed. Please try again.");
        }
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
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-auto h-[45%] pointer-events-none"
            />
            <h2 className="text-3xl font-bold text-center mb-2 text-slate-800">Sign Up</h2>

            {error && <p className="text-red-500 mb-3 text-sm italic">{error}</p>}

            <div className="mb-10"></div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                className="w-full px-3 py-2 border-b-2 border-black rounded-none bg-gray-100 focus:outline-none"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                />
                <input
                className="w-full px-3 py-2 border-b-2 border-black rounded-none bg-gray-100 focus:outline-none"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                />
                <input
                className="w-full px-3 py-2 border-b-2 border-black rounded-none bg-gray-100 focus:outline-none"
                placeholder="Confirm Password"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
                />
                <button
                type="submit"
                className="w-[30%] text-center bg-emerald-400 text-white py-2 rounded hover:bg-emerald-500 transition font-semibold"
                >
                Create Account
                </button>
            </form>

            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    </div>
  );
}
