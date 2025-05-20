import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const RegisterButton = ({ setUser }) => {
  // ✅ Accepts setUser for authentication
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);

        setUser({ username: data.username }); // ✅ Store login state in React instead of sessionStorage
        window.alert("Registration successful. Please proceed to login.");
        window.location.reload();
        // navigate("/"); // ✅ Redirect to landing page
      } else {
        // Ensure validation errors are handled correctly
        if (Array.isArray(data)) {
          setErrorMessage(data.map((err) => err.msg).join(", ")); // ✅ Extract messages from validation errors
        } else {
          setErrorMessage(
            data.msg || "Registration failed. Please check your details."
          );
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <div className={styles.registerBtn}>
      {!showRegister ? (
        <button onClick={() => setShowRegister(true)}>Register</button>
      ) : (
        <div className="registerForm">
          <h3>Register</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username (10-50 chars)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password (10-50 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegisterSubmit}>Submit</button>
          <button onClick={() => setShowRegister(false)}>Cancel</button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default RegisterButton;
