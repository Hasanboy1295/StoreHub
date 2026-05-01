import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

import "../../../css/login.css";

export default function LoginPage() {
  const history = useHistory();
  const { setAuthMember } = useGlobals();
  const [form, setForm] = useState({
    memberPhone: "",
    memberPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const memberService = new MemberService();
      const member = await memberService.login({
        memberNick: form.memberPhone,
        memberPassword: form.memberPassword,
      });
      // Update global auth state without page reload
      setAuthMember(member);
      await sweetTopSuccessAlert("Logged in!", 700);
      // Redirect to home page
      history.push("/");
    } catch (err: any) {
      setError("Login failed. Please try again.");
      sweetErrorHandling(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-img-section">
         <img
    src="/img/login.jpg"
  alt="Shopping"
  className="login-img"
/>
        </div>
        <div className="login-form-section">
          <h2 className="login-title">Log in to Exclusive</h2>
          <p className="login-subtitle">Enter your details below</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="memberPhone"
              placeholder="Email or Phone Number"
              className="login-input"
              value={form.memberPhone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="memberPassword"
              placeholder="Password"
              className="login-input"
              value={form.memberPassword}
              onChange={handleChange}
              required
            />
            <div className="login-btn-row">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
              <a href="/forgot-password" className="forgot-link">
                Forget Password?
              </a>
            </div>
          </form>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <button
            className="google-btn"
            type="button"
            style={{ marginTop: 16 }}
            onClick={() => {
              window.location.href =
                process.env.REACT_APP_API_URL
                  ? `${process.env.REACT_APP_API_URL}/auth/google`
                  : "http://localhost:3025/auth/google";
            }}
          >
            <img
              src="/img/Icon-Google.png"
              alt="Google"
              className="google-icon"
            />
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}