import { useForm } from "react-hook-form";
import { registerUser, getMe } from "../Api/user.api";
import { useNavigate } from "react-router-dom";
import registerPic from "../assets/register.webp";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
export type registerForm = {
  userName: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: registerForm) => {
    try {
      setLoading(true);
      setServerError(null);
      await registerUser(data);
      const me = await getMe();
      setUser(me.data);
      navigate("/home");
    } catch (error: any) {
      console.log("hi", error);
      setServerError(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Left Side - Image / Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-10">
          <div className="text-center">
            {/* Replace this with your actual image */}
            <img
              src={registerPic}
              alt="Create account"
              className="w-full max-w-sm mx-auto"
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Start Your Journey
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 max-w-sm mx-auto">
              Join TalentScanner to analyze your skills and prepare with
              personalized insights.
            </p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

            <p className="mt-2 text-sm text-gray-500">
              Register to get started with your interview preparation.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Username
              </label>

              <input
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Enter username"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
              />

              {errors.userName && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="Enter email"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Enter password"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "Register..." : "Register"}
            </button>

            {/* Warning / Error Message */}
            {serverError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-center text-xs font-medium text-red-600">
                {serverError}
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-gray-900 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
