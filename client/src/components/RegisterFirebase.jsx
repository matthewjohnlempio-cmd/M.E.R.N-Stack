import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, realtimeDb } from "../firebase"; // Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // -------------------------
      // Firebase Registration
      // -------------------------
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        form.email,
        form.password
      );

      // Save additional user data in Realtime Database
      await set(ref(realtimeDb, "users/" + userCredential.user.uid), {
        name: form.name,
        email: form.email,
        address: form.address,
      });

      alert("Registration successful with Firebase!");
      navigate("/login/firebase");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Try logging in instead.");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else if (err.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        alert(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Create an account
        </h2>
        <p className="text-slate-400 text-center mb-6">
          Join us and get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Full name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-800 text-white px-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-800 text-white px-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Address
            </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-slate-800 text-white px-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-xl bg-slate-800 text-white px-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Minimum 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 transition flex items-center justify-center disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account…
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login/firebase")}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            Login
          </button>
        </p>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
}
