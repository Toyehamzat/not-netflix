"use client";
import Input from "@/components/input";
import axios from "axios";
import { useCallback, useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [variant, setVariant] = useState<string>("Login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "Login" ? "Register" : "Login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });
      // Handle success or navigate to another page
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error, e.g., show an error message
    }
  }, [email, username, password]);

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
                  onChange={(e: any) => setUsername(e.target.value)}
                  id="username"
                  value={username}
                />
              ) : null}

              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
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
