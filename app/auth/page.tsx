// auth.tsx
"use client";
import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [variant, setVariant] = useState("Login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);

  const validatePassword = (inputPassword: string) => {
    // Add your password requirements here
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    setPasswordError(
      passwordRegex.test(inputPassword)
        ? null
        : "Password must be at least 8 characters long and include a digit and a capital letter."
    );
  };

  const validateUsername = (inputUsername: string) => {
    setUsernameError(inputUsername ? null : "Username is required.");
  };

  const validateEmail = (inputEmail: string) => {
    setEmailError(inputEmail ? null : "Email is required.");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    validateUsername(newUsername);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const register = useCallback(async () => {
    try {
      if (passwordError || usernameError || emailError) {
        // Display error messages and prevent registration if any field is invalid
        console.error(
          "Invalid input. Please check username, email, and password."
        );
        return;
      }

      await axios.post("/api/auth/register", {
        email,
        username,
        password,
      });
      // Handle success or navigate to another page
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error, e.g., show an error message
    }
  }, [email, username, password, passwordError, usernameError, emailError]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-60">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-7 sm:h-12" />
        </nav>
        <div className="m-auto flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full  ">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" ? (
                <Input
                  label="Username"
                  onChange={handleUsernameChange}
                  id="username"
                  value={username}
                />
              ) : null}
              {usernameError && (
                <div className="text-xs text-red-500 mt-2">{usernameError}</div>
              )}

              <Input
                label="Email"
                onChange={handleEmailChange}
                id="email"
                type="email"
                value={email}
              />
              {emailError && (
                <div className="text-xs text-red-500 mt-2">{emailError}</div>
              )}

              <Input
                label="Password"
                onChange={handlePasswordChange}
                id="password"
                type="password"
                value={password}
                isPassword
              />
              {passwordError && (
                <div className="text-xs text-red-500 mt-2">{passwordError}</div>
              )}
            </div>
            <button
              onClick={register}
              className="bg-red-600 mt-11 py-3 text-white rounded-md w-full hover:bg-red-700 transition font-bold"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-white flex flex-row justify-between mt-1">
              <span className="text-white/50 flex flex-row gap-1 text-sm cursor-pointer">
                <input type="checkbox" size={5} />
                <p>Remember me</p>
              </span>
              <span className="text-white/50 hover:underline text-sm cursor-pointer">
                Need help?
              </span>
            </p>
            <div className="py-14">
              <p className="text-white/40">
                {variant === "Login"
                  ? "New to Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white cursor-pointer  hover:underline"
                >
                  {" "}
                  {variant === "Login" ? "Sign up now" : "Sign in now"}
                </span>
              </p>
              <div className="pt-5 text-white/60 text-sm">
                This page is not protected by Google reCAPTCHA which ensures
                you're not a bot.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
