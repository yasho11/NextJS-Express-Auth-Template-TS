"use client";

// 📦 Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { Switch } from "@headlessui/react";

const SignUpPage = () => {
  // Local States
  const [showPassword, setShowPassword] = useState(false); // Show/hide password
  const [darkMode, setDarkMode] = useState(false); // Theme toggle

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Zustand store for auth
  const { signup, isLoading, authUser } = useAuthStore();

  // Next.js router
  const router = useRouter();
  useEffect(() => {
    if (authUser) {
      router.push("/profile");
    }
  }, [authUser, router]);
  //  Theme toggle logic
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "bumblebee" : "halloween"
    );
  };

  //  Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation logic
  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (formData.password.length < 4) return toast.error("Password must be at least 4 characters");
    return true;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    // Call signup (no need to immediately redirect here)
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200 transition-colors duration-300">
      <div className="w-full max-w-md shadow-xl bg-base-100 rounded-2xl p-8">
        {/*  Theme toggle */}
        <div className="flex justify-end mb-4">
          <Switch
            checked={darkMode}
            onChange={handleThemeToggle}
            className={`${
              darkMode ? "bg-purple-800" : "bg-yellow-500"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Toggle Theme</span>
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                <User className="inline w-4 h-4 mr-1" />
                Full Name
              </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                <Mail className="inline w-4 h-4 mr-1" />
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                <Lock className="inline w-4 h-4 mr-1" />
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/*  Link to Sign In */}
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <a href="/signin" className="link link-primary">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
