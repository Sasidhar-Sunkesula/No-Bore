import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { openMenu } from "../utils/menuSlice";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatchFun = useDispatch();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://nobore-backend.onrender.com/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      //   dispatch({type: 'LOGIN', payload: json})
      dispatchFun(login(json));

      // update loading state
      setIsLoading(false);
      dispatchFun(openMenu());
      navigate("/");
    }
  };

  return { signup, isLoading, error };
};
