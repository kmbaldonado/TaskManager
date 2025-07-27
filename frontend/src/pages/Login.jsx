import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", new URLSearchParams(form));
    login(res.data.access_token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" name="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Password" name="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button>Login</button>
    </form>
  );
}
