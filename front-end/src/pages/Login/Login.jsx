import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../App";

const Login = () => {

  // Navigation
  const navigate = useNavigate();

  // Schema
  const schema = z.object({
    email: z.string({ required_error: "Email Is Required." }).min(1, { message: "Email Is Required." }).email({ message: "Please Write A Valid Email." }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be at Least 6 Characters" }).max(300)
  });
  // Register
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema)
  });

  // On Submit Handler
  const onSubmitHandler = async (data) => {
    const userDetails = {
      email: data.email,
      password: data.password
    };
    try {
      const response = await axios.post(backendUrl + "/api/users/login", userDetails);
      const token = response.data.user.token;
      window.localStorage.setItem("Token", token);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full sm:w-2/4 border p-5 rounded-xl">

        {/* Title */}
        <div className="flex items-center gap-3 justify-center mb-5">
          <p className="text-gray-800 text-xl sm:text-3xl login prata-regular">Login</p>
          <p className="h-[2px] w-7 bg-gray-500"></p>
        </div>
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input type="email" placeholder="Email" required className="mb-4 border border-gray-600 rounded py-2 px-3 block w-full" {...register("email")} />
            <input type="Password" placeholder="Password" required className="border border-gray-600 rounded py-2 px-3 block w-full" {...register("password")} />
            <div className="flex items-center justify-between text-gray-700 mt-3">
              <p className="cursor-pointer">Forget Your Password?</p>
              <p className="cursor-pointer" onClick={() => { navigate("/register"); }}>Create Account</p>
            </div>
            <button type="submit" className="text-lg transition-all hover:bg-slate-800 mt-5 block bg-black text-white py-1.5 px-5 rounded mx-auto"            >Log In</button>
          </form>
        </div>
        {/* Form */}

      </div>
    </div>
  );
};

export default Login;
