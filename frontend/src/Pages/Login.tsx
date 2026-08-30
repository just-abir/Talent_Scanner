import React from "react";
import { useForm } from "react-hook-form";
import { getMe, loginUser } from "../Api/user.api";
import { useNavigate } from "react-router-dom";
export type loginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<loginForm>();

  const onSubmit = async (data: loginForm) => {
    try {
      const response = await loginUser(data);
      console.log("Response", response);

      // const reponse2 =await getMe();
      // console.log("response ", reponse2)
      navigate("/home");
    } catch (error) {
      console.log("hi", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        {/* UserName */}

        <div>
          <label className="">Email</label>
          <input
            {...register("email")}
            className=" border-2 rounded-md  h-10 w-96"
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
            type="text"
          />
        </div>

        <button className="font-bold text-2xl border-cyan-800 border-2 p-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
