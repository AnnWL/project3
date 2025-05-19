import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className="loginBtn">
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default LoginButton;
