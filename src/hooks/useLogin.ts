import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice"; // Import login action from your Redux slice
import { useNavigate } from "react-router-dom";
import { openMenu } from "../utils/menuSlice";

interface LoginResponse {
  error: string | null;
}

interface LoginHook {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLogin = (): LoginHook => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginRequest = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Check if email or password is empty
    if (!email || !password) {
      setError("All fields must be filled");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://nobore-backend.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const json: LoginResponse = await response.json();
        throw new Error(json.error!);
      }

      const json = await response.json();

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Dispatch action to update Redux store with user data
      dispatch(login(json)); // Dispatch the login action with user data

      setIsLoading(false); // Update loading state
      dispatch(openMenu());
      navigate("/");
    } catch (error: any) {
      setError(error.message); // Set error message
      setIsLoading(false); // Update loading state
    }
  };

  return { login: loginRequest, isLoading, error }; // Return login function with a different name
};
