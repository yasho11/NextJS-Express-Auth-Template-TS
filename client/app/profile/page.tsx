"use client";

// ✅ Import React hooks and libraries
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // App Router redirection
import { useAuthStore } from "@/stores/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { Logout } from "@/components/ui/Logout";
import { Switch } from "@headlessui/react";

const Profile = () => {
  // Auth store actions and state
  const { checkAuth, authUser, isLoading, updateProfile } = useAuthStore();

  // Local state
  const [selectedImg, setSeletedImg] = useState<string | ArrayBuffer | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redirect to signup if user is not authenticated
  useEffect(() => {
    if (!isLoading && (!authUser || !authUser.User)) {
      router.push("/signin");
    }
  }, [authUser, isLoading, router]);

  // Handle profile image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSeletedImg(base64Image);
      await updateProfile({ profileUrl: base64Image });
    };
  };

  // Handle dark/light theme toggle
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "bumblebee" : "halloween");
  };

  // Loading state or unauthorized user display
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-zinc-400">
        Loading your profile...
      </div>
    );
  }

  // Render profile page
  return (
    <div className="h-screen pt-20 bg-base-100">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 relative">

          {/* Top bar: Logout + Theme Switch */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Logout />
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
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2 text-sm text-zinc-400">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.User?.profileUrl || "/user.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isLoading ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isLoading ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.User?.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.User?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.User?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
