import { useState, useEffect, useRef } from "react";
import { auth } from "../config/firebaseClient"; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import * as faceapi from "face-api.js";
import "./Login.css";

function Login() {
  const [language, setLanguage] = useState("en");
  // const [name, setName] = useState("");
  const videoRef = useRef(null);
  // const [faceModelLoaded, setFaceModelLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);


  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const login = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      // Firebase Sign-in Attempt
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prevent login if email is not verified
      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      // Send request to backend for MongoDB password validation
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Login failed: " + data.message);
      }

    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Video Background */}
      <div className="login-video-background">
        <video autoPlay loop muted playsInline>
          <source src="images/Farmers.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      <div className="login-container">
        {/* Header Section */}
        <div className="login-header">
          <h1>🌾 Farmer's Portal 🌾</h1>
          <select id="language" onChange={changeLanguage} value={language}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        {/* Form Section */}
        <div className="login-form-container">
          <form className="login-form">
            <h2>Login</h2>
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
            <button type="button" onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
            <br />
            <button type="button" onClick={login}>
              Login With Face
            </button>
            <video ref={videoRef} className="login-video" width="320" height="240" autoPlay muted></video>
            <h3>
              Don't have an account? <a href="signup.html">Signup</a>
            </h3>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
