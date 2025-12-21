import React, { useState } from "react";

export default function Example() {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white w-full max-w-[360px] mx-4 p-6 py-8 text-sm rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {state === "login"
            ? "Login to Your Account"
            : "Create a New Account"}
        </h2>

        {state === "sign-up" && (
          <input
            className="w-full cursor-text border bg-indigo-50 mb-3 border-gray-200 outline-none rounded-md py-2.5 px-3 focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Username"
            required
          />
        )}

        <input
          className="w-full cursor-text border bg-indigo-50 mb-3 border-gray-200 outline-none rounded-md py-2.5 px-3 focus:ring-2 focus:ring-indigo-400"
          type="email"
          placeholder="Email"
          required
        />

        <input
          className="w-full cursor-text border bg-indigo-50 mb-6 border-gray-200 outline-none rounded-md py-2.5 px-3 focus:ring-2 focus:ring-indigo-400"
          type="password"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          className="
            w-full
            cursor-pointer
            mb-4
            bg-indigo-500
            text-white
            py-2.5
            rounded-md
            font-medium
            transition-all
            duration-200
            hover:bg-indigo-600
            hover:shadow-lg
            active:scale-95
          "
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        {state === "sign-up" && (
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setState("login")}
              className="cursor-pointer text-indigo-500 font-medium hover:underline"
            >
              Log In
            </button>
          </p>
        )}

        {state === "login" && (
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => setState("sign-up")}
              className="cursor-pointer text-indigo-500 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        )}
      </form>
    </div>
  );
}
