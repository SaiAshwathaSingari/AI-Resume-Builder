import React, { useState } from "react";
import api from "../configs/api.js";
import { useNavigate } from "react-router-dom";
import {  useDispatch,useSelector } from "react-redux";
import { login } from "../redux/features/authSlice.js";
import toast from "react-hot-toast";
import { useEffect } from "react";
export default function Example() {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  // ✅ normalize state (fixes button text issue)
  const normalizedState =
    urlState === "login" || urlState === "sign-up"
      ? urlState
      : "login";

  const [state, setState] = useState(normalizedState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // validations
  const isValidEmail = (em) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const hasNumber = (str) => /\d/.test(str);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button clicked");
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (state === "login" && password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (state === "sign-up") {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
      if (!hasNumber(password)) {
        toast.error("Password must include a number");
        return;
      }
    }

    try {
      if (state === "login") {
        const res = await api.post("/api/users/login", {
          email,
          password,
        });

        const data = res.data;

        dispatch(
          login({
            token: data.token,
            user: data.user,
          })
        );

        localStorage.setItem("token", data.token);
        toast.success("Login successful");
        navigate("/app");
      } else {
        const res = await api.post("/api/users/register", {
          name,
          email,
          password,
        });

        const data = res.data;

        // auto-login after signup
        dispatch(
          login({
            token: data.token,
            user: data.user,
          })
        );

        localStorage.setItem("token", data.token);
        toast.success("Registration successful");
        navigate("/app");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };
   const { user } = useSelector(state => state.auth);
 useEffect(() => {

    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3EFE6] px-4 font-sans">
      <div className="bg-white w-full max-w-[400px] p-8 rounded-2xl shadow-sm border border-black/5">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1F3D2B]">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[#1F3D2B]/60 text-sm mt-2">
            {state === "login"
              ? "Enter your credentials to continue."
              : "Sign up to get started."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "sign-up" && (
            <input
              type="text"
              placeholder="Your name"
              className="w-full border rounded-lg py-3 px-4"
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="email@example.com"
            className="w-full border rounded-lg py-3 px-4"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="••••••••"
            className="w-full border rounded-lg py-3 px-4"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {state === "sign-up" && (
            <p className="text-xs text-black/60">
              Min 8 characters, include at least one number
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1F3D2B] text-white py-3 rounded-lg font-semibold"
          >
            {state === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          {state === "login" ? (
            <button
              onClick={() => setState("sign-up")}
              className="text-[#1F3D2B] font-bold"
            >
              Create an account
            </button>
          ) : (
            <button
              onClick={() => setState("login")}
              className="text-[#1F3D2B] font-bold"
            >
              Log in instead
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
