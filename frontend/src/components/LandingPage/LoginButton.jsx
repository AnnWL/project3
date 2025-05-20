import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ setUser }) => {
  // ✅ Accepts setUser for authentication
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);

        setUser({ username: data.username }); // Store login state in React instead of sessionStorage

        navigate("/"); // Redirect to landing page
      } else {
        console.error("Login failed:", data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="loginBtn">
      {!showLogin ? (
        <button onClick={() => setShowLogin(true)}>Login</button>
      ) : (
        <div className="loginForm">
          <h3>Login</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLoginSubmit}>Submit</button>
          <button onClick={() => setShowLogin(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
