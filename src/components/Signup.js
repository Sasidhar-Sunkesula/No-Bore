import { useEffect, useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useDispatch } from "react-redux";
import { closeMenu, openMenu } from "../utils/menuSlice";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const dispatchFun = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    dispatchFun(closeMenu());
    return () => {
      dispatchFun(openMenu());
    };
  });
  return (
    <form
      className="signup rounded-xl text-black shadow-xl"
      onSubmit={handleSubmit}
    >
      <h3 className=" text-center text-2xl mb-4 font-bold p-4">Sign Up</h3>

      <label className=" mt-28 py-4 font-semibold text-base">
        Email address:
      </label>
      <input
        placeholder="Enter your email"
        className="px-4 bg-white py-3"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className=" py-4 font-semibold text-base">Password:</label>
      <input
        className="px-4 bg-white py-3"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        className="border w-full my-5 p-4 bg-slate-950 mx-auto"
        disabled={isLoading}
      >
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
      <div className="flex justify-center gap-1">
        <p>Already have an account? </p>
        <Link className="underline text-blue-500" to={"/login"}>
          {" "}
          Login instead
        </Link>
      </div>
    </form>
  );
};

export default Signup;
