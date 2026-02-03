import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../firebase"; // Firebase Auth import
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginFirebase() {
  const [form, setForm] = useState({
    email: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase login
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        form.email,
        form.password
      );

      // Save user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );

      alert("Login successful!");
      navigate("/dashboard/firebase"); // Redirect after login
    } catch (err) {
      // Firebase error handling
      if (err.code === "auth/user-not-found") {
        alert("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        alert("Invalid email format.");
      } else {
        alert(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome back
        </h2>
        <p className="text-slate-400 text-center mb-6">
          Log in to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
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
            <label className="block text-sm text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full rounded-xl bg-slate-800 text-white px-4 py-3 outline-none ring-1 ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
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
                Logging in…
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register/firebase")}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition"
          >
            Register
          </button>
        </p>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
        `}
      </style>
    </div>
  );
}
