import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { closeMenu, openMenu } from "../utils/menuSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const dispatchFun = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatchFun(closeMenu());
    return () => {
      dispatchFun(openMenu());
    };
  });

  return (
    <form
      className="login rounded-xl text-black shadow-xl"
      onSubmit={handleSubmit}
    >
      <h3 className=" text-center text-2xl mb-4 font-bold p-4">Log In</h3>

      <label className=" mt-28 py-4 font-semibold text-base">
        Email address:
      </label>
      <input
        className="px-4 bg-white py-3"
        type="email"
        placeholder="Enter your email"
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
        Log in
      </button>
      {error && <div className="error">{error}</div>}
      <div className="flex justify-center gap-1">
        <p>New here? </p>
        <Link to="/signup" className="underline text-blue-500">
          Signup instead
        </Link>
      </div>
    </form>
  );
};

export default Login;
