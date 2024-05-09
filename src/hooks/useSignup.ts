import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { openMenu } from "../utils/menuSlice";

interface SignUpResponse {
  error: string | null;
}

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://nobore-backend.onrender.com/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const json: SignUpResponse = await response.json();
        setError(json.error);
        throw new Error(json.error!);
      }

      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(login(json));
      setIsLoading(false);
      dispatch(openMenu());
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred during signup:", error);
    }
  };

  return { signup, isLoading, error };
};
