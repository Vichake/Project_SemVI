import { useState, useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";
import "./Login.css";

function Login() {
  const [language, setLanguage] = useState("en");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const videoRef = useRef(null);
  const [faceModelLoaded, setFaceModelLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList.add("login-root");
    }
    return () => {
      if (rootElement) {
        rootElement.classList.remove("login-root");
      }
    };
  }, []);

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const login = () => {
    console.log("Login with:", name, password);
    // Implement login authentication here
  };

  return (
    <>
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="images/Farmers.mp4" type="video/mp4" />
          {/* Fallback text for browsers that don't support video */}
          Your browser does not support HTML5 video.
        </video>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="header">
          <h1>🌾Farmer's Portal🌾</h1>
          {/* Language Selection */}
          <select id="language" onChange={changeLanguage} value={language}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        {/* Form Section */}
        <div id="login-section">
          {/* Login Form */}
          <form id="login-form">
            <h2>Login</h2>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={login}>
              Login
            </button>
            <br />
            <button type="button" onClick={login}>
              Login With Face
            </button>
            <video ref={videoRef} id="video" width="320" height="240" autoPlay muted></video>
            <div className="footer">
              <p>
                Don't have an account? <a href="signup.html">Signup</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
