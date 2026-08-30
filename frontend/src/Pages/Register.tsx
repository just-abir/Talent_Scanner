import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../Api/user.api";
import { useNavigate } from "react-router-dom";

export type registerForm = {
  userName: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>();

  const onSubmit = async (data: registerForm) => {
    try {
      const response = await registerUser(data);
      console.log("Response", response);
      navigate("/home");
    } catch (error) {
      console.log("hi", error);
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="card bg-amber-200 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center  ">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className=" ">
          {/* UserName */}

          <div>
            <label className="register ">Username</label>
            <input
              {...register("userName", {
                required: "userName is reuired",
                minLength: {
                  value: 3,
                  message: "username must be 3 character",
                },
                onBlur: (e) => {
                  console.log("typing : ", e.target.value);
                },
              })}
              className=" border-2 rounded-md  h-10 w-96"
              type="text"
              placeholder="Enter usrename.."
            />
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>

          <div>
            <label className="">Email</label>
            <input
              className=" border-2 rounded-md  h-10 w-96"
              {...register("email")}
              type="text"
              placeholder="enter email"
            />
          </div>

          <div>
            <label className="">Password</label>
            <input
              {...register("password")}
              className=" border-2 rounded-md  h-10 w-96"
              placeholder="password"
              type="password"
            />
          </div>

          <button className="font-bold text-2xl border-cyan-800 border-2 p-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
