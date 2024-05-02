import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice"; // Import login action from your Redux slice
import { useNavigate } from "react-router-dom";
import { openMenu } from "../utils/menuSlice";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginRequest = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // Check if email or password is empty
    if (!email || !password) {
      setError("All fields must be filled");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }
      
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Dispatch action to update Redux store with user data
      dispatch(login(json)); // Dispatch the login action with user data
      
      setIsLoading(false); // Update loading state
      dispatch(openMenu());
      navigate("/");
    } catch (error) {
      setError(error.message); // Set error message
      setIsLoading(false); // Update loading state
    }
  };

  return { login: loginRequest, isLoading, error }; // Return login function with a different name
};
