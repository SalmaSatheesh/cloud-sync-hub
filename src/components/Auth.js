import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // Importing the new auth-specific CSS

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const payload = isRegister
        ? { firstName: formData.firstName, lastName: formData.lastName, dob: formData.dob, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(isRegister ? "✅ Registration successful! Redirecting..." : "✅ Login successful! Redirecting...");

      if (isRegister) {
        setTimeout(() => navigate("/"), 2000);
      } else {
        localStorage.setItem("token", response.data.token);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "❌ Error processing request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Welcome Back</h1>
        <p>
          to Cloud Sync Hub
        </p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>{isRegister ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </>
            )}
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {isRegister && <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />}

            {!isRegister && (
              <div className="auth-options">
                <label>
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />Remember Me
                </label>
                <span className="forgot-password">Forgot Password?</span>
              </div>
            )}

            <button type="submit" disabled={loading}>{loading ? "Processing..." : isRegister ? "Sign Up" : "Sign in now"}</button>
          </form>
          {message && <p className="auth-message">{message}</p>}
          <p className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </p>
          <p className="terms">
            By clicking on "Sign in now" you agree to our <span>Terms of Service</span> | <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
