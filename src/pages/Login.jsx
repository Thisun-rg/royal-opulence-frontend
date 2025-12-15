import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import './Login.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/rooms");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Royal Opulence Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  );
}
