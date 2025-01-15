import { useState } from "react";
import { toast } from "react-toastify";
import "./Subscribe.css";

const Subscribe = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  // onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setSubscribeEmail("");
    toast.success("Subscribe Successfully");
  };

  return (
    <div className="py-10 flex flex-col items-center">
      <p className="text-gray-900 font-semibold tracking-wide text-3xl mb-2">Subscribe now & get 20% off</p>
      <p className="text-gray-500 text-sm sm:text-md lg:text-base font-semibold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <form className="mt-10 w-full sm:w-1/2" onSubmit={onSubmitHandler}>
        <div className="h-[45px] w-[100%] flex items-center">
          <input value={subscribeEmail} onChange={(event) => { setSubscribeEmail(event.target.value); }}
            type="email" placeholder="Enter your email" required className="w-full border border-gray-500 border-r-0 outline-none h-[45px] py-2 px-3" />
          <button type="submit" className="bg-black text-sm text-white h-[45px] py-4 px-8">SUBSCRIBE</button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
