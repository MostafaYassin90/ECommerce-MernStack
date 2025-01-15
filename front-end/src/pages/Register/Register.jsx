import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {

  // Navigate
  const navigate = useNavigate();

  // Schema
  const schema = z.object({
    username: z.string({ required_error: "Username Is Requried." }).min(2, { message: "Username Must Be At Least 2 Characters" }).max(200),
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
      username: data.username,
      email: data.email,
      password: data.password
    };
    try {
      const response = await axios.post("http://localhost:4000/api/users/register", userDetails);
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
          <p className="text-gray-800 text-xl sm:text-3xl login prata-regular">Register</p>
          <p className="h-[2px] w-7 bg-gray-500"></p>
        </div>
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>

            <input type="text" placeholder="Username" required className="mb-4 border border-gray-600 rounded py-2 px-3 block w-full" {...register("username")} />
            {errors.username && <p className="text-sm font-semibold text-red-700 mb-5">{errors.username.message}</p>}

            <input type="email" placeholder="Email" required className="mb-4 border border-gray-600 rounded py-2 px-3 block w-full" {...register("email")} />
            {errors.email && <p className="text-sm font-semibold text-red-700 mb-5">{errors.email.message}</p>}

            <input type="Password" placeholder="Password" required className="border border-gray-600 rounded py-2 px-3 block w-full" {...register("password")} />
            {errors.password && <p className="text-sm font-semibold text-red-700 mb-5">{errors.password.message}</p>}

            <div className="flex items-center justify-between text-gray-700 mt-3">
              <p className="cursor-pointer">Forget Your Password?</p>
              <p className="cursor-pointer" onClick={() => { navigate("/login"); }}>Login Here</p>
            </div>
            <button type="submit" className="text-lg transition-all hover:bg-slate-800 mt-5 block bg-black text-white py-1.5 px-5 rounded mx-auto">Register</button>
          </form>
        </div>
        {/* Form */}

      </div>
    </div>
  );
};

export default Register;
