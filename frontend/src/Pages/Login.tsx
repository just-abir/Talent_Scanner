import { useForm } from "react-hook-form";
import { getMe, loginUser } from "../Api/user.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Talent_Scanner from "../assets/Talent_Scanner.jpg";
export type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<loginForm>();

  const onSubmit = async (data: loginForm) => {
    try {
      await loginUser(data);

      const reponse2 = await getMe();

      setUser(reponse2.data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Left Side - Image / Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gray-100 p-10">
          <div className="text-center">
            <img
              src={Talent_Scanner}
              alt="Login"
              className="w-full max-w-sm mx-auto"
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 max-w-sm mx-auto">
              Get personalized insights, sharpen your skills, and move closer to
              your next opportunity.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-gray-900 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
