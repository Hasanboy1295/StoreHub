import React, { useState } from "react";
import MemberService from "../../services/MemberService";
import { MemberInput } from "../../../lib/types/member";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import "../../../css/signup.css";

export default function SignupPage() {
  const [form, setForm] = useState<MemberInput>({
    memberNick: "",
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
      await memberService.signup(form);
      await sweetTopSuccessAlert("Account created!", 1200);
      // Optionally redirect or clear form here
    } catch (err: any) {
      setError("Signup failed. Please try again.");
      sweetErrorHandling(err);
    }
    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-img-section">
          <img
           src="/img/login.jpg"
            alt="Shopping"
            className="signup-img"
          />
        </div>
        <div className="signup-form-section">
          <h2 className="signup-title">Create an account</h2>
          <p className="signup-subtitle">Enter your details below</p>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="memberNick"
              placeholder="Name"
              className="signup-input"
              value={form.memberNick}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="memberPhone"
              placeholder="Email or Phone Number"
              className="signup-input"
              value={form.memberPhone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="memberPassword"
              placeholder="Password"
              className="signup-input"
              value={form.memberPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          <button className="google-btn" type="button">
            <img
              src="/img/Icon-Google.png"
              alt="Google"
              className="google-icon"
            />
            Sign up with Google
          </button>
          <div className="signup-login-link">
            Already have account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}