import { useState, useEffect } from "react";
import { auth } from "../config/firebaseClient"; //Import Firebase auth
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [language, setLanguage] = useState("en");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("signup-page");
    return () => {
      document.body.classList.remove("signup-page");
    };
  }, []);

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const signup = async () => {
    if (!userName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Call backend API (No direct Firebase Auth calls)
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please check your email for verification.");
        navigate("/login");
      } else {
        alert(data.message); // Show backend error message if signup fails
      }
    } catch (error) {
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signup-container">
      {/* Video Background */}
      <div className="signup-video-background">
        <video autoPlay loop muted playsInline>
          <source src="images/Farmers.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Header Section */}
      <div className="signup-header">
        <h1>🌾 Farmer's Portal 🌾</h1>
        <select id="language" onChange={changeLanguage} value={language}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>
      </div>

      {/* Signup Section */}
      <div className="signup-form-container">
        <form className="signup-form">
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Enter Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={signup} disabled={loading}>
            {loading ? "Signing Up..." : "Signup"}
          </button>
          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <span className="login-link" onClick={() => navigate("/login")}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
