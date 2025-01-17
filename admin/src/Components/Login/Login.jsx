import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { backendUrl } from '../../App';
import "./Login.css";


function Login(props) {
  const setToken = props.setToken;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");

  // onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const schema = z.object({
        email: z.string({ required_error: "Email Is Required." }).min(1, { message: "Email Is Requried." }).email({ message: "Invalid Email" }),
        password: z.string({ required_error: "Password Is Required." }).min(8, { message: "Password Is InCorrect." })
      });
      const validation = schema.safeParse({ email, password });

      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        return;
      }

      const response = await axios.post(backendUrl + "/api/users/admin", { email, password });
      if (response.data.success === true) {
        setToken(response.data.token);
      }

    } catch (error) {
      console.log(error);
      setSubmitError(error.response.data.message);
    }
  };

  return (
    <div className="login">

      <div className="holder-form">
        <h2 className="login-title">Admin Panal</h2>
        {/* Form*/}
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Your@email.com" id="email" name="email"
              value={email} onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          {/* Password */}
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Type Your Password" id="password" name="password"
              value={password} onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="submit-btn">Login</button>
        </form>
        {submitError !== "" && <p className="submit-error">{submitError}</p>}
      </div>

    </div>
  );
}
export default Login;