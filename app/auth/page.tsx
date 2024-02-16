// auth.tsx
"use client";
import Input from "@/components/input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import Image from "next/image";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [nameError, setnameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null); // New state for login error
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [variant, setVariant] = useState("Login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
    setLoginError(null); // Reset login error when switching between login and register
  }, []);

  const validatePassword = (inputPassword: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    setPasswordError(
      passwordRegex.test(inputPassword)
        ? null
        : "Password must be at least 8 characters long and include a digit and a capital letter."
    );
  };

  const validatename = (inputname: string) => {
    setnameError(inputname ? null : "Name is required.");
  };

  const validateEmail = (inputEmail: string) => {
    setEmailError(inputEmail ? null : "Email is required.");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handlenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newname = e.target.value;
    setname(newname);
    validatename(newname);
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  useEffect(() => {
    setIsFormFilled(Boolean(name) || Boolean(email) || Boolean(password));
  }, [name, email, password]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (registrationSuccess) {
      // Hide the success message after 2 seconds
      timeoutId = setTimeout(() => {
        setRegistrationSuccess(false);
      }, 5000);
    }

    // Cleanup the timeout when the component unmounts or when registrationSuccess changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [registrationSuccess]);
  const login = useCallback(async () => {
    try {
      setIsLoading(true);

      // Perform the sign-in
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (err) {
      // Handle errors, if any
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      setIsLoading(true);
      if (Boolean(passwordError) || Boolean(nameError) || Boolean(emailError)) {
        // Display error messages and prevent registration if any field is invalid
        console.error("Invalid input. Please check name, email, and password.");
        return;
      }

      await axios.post("/api/auth/register", {
        email,
        name,
        password,
      });
      // Handle success
      // setVariant("login");
      setRegistrationSuccess(true);
    } catch (error: any) {
      console.error("Registration error:", error.e);
      if (
        error.response?.status === 409 &&
        error.response.data?.message === "Email is already in use"
      ) {
        setEmailError("Email already exists. Please use a different email.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, passwordError, nameError, emailError]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-60">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" className="h-7 sm:h-12" />
        </nav>
        <div className="m-auto flex justify-center ">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full  ">
            <h2 className="text-white text-4xl font-semibold mb-8">
              {variant}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "Register" ? (
                <Input
                  label="Name"
                  onChange={handlenameChange}
                  id="name"
                  value={name}
                />
              ) : null}
              {nameError && (
                <div className="text-xs text-red-500 mt-2">{nameError}</div>
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
              onClick={variant === "Login" ? login : register}
              disabled={!isFormFilled || isLoading}
              className="bg-red-600 mt-11 py-3 text-white rounded-md w-full hover:bg-red-700 transition font-bold cursor-pointer disabled:cursor-default disabled:bg-red-700"
            >
              {isLoading ? (
                <div className=" inset-0 flex items-center justify-center">
                  <BeatLoader color="#ffffff" loading={isLoading} size={10} />
                </div>
              ) : variant === "Login" ? (
                "Login"
              ) : (
                "Sign up"
              )}
            </button>
            {loginError && (
              <div className="text-xs text-red-500 mt-2">{loginError}</div>
            )}
            {registrationSuccess && (
              <div className="text-xs text-green-500 mt-2">
                Registration successful! Please Sign in.
              </div>
            )}
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
                This page is not protected by Google reCAPTCHA which ensures you
                are not a bot.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
