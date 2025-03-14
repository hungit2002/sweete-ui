"use client";
import { login } from "@/Services/authServices";
import { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ModalNotify from "../../components/modal/ModalNotify";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Spinner } from "react-bootstrap";

interface IFormInput {
  account: string;
  password: string;
}

export default function Login() {
  const [showNoti, setShowNoti] = useState<any>({
    success: true,
    show: false,
  });
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIsLoggingIn(true);
    login(data.account, data.password)
      .then((res: AxiosResponse) => {
        setIsLoggingIn(false);
        if (res.data.meta.code === 200) {
          setMessage(res.data.meta.message);
          setShowNoti({ ...showNoti, show: true, success: true });
          localStorage.setItem("access_token", res.data.result.access_token);
          localStorage.setItem("user_info", JSON.stringify(res.data.result.user));
          setTimeout(() => {
            redirect("/");
          }, 2200);
        }
      })
      .catch((err) => {
        setIsLoggingIn(false);
        if (err.response.data.meta.message) {
          setMessage(err.response.data.meta.message);
          setShowNoti({ ...showNoti, show: true, success: false });
        } else {
          setMessage("Server error !");
        }
      });
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center">
      <div className="container flex justify-center">
        <div className="grid md:grid-cols-1 gap-4 max-w-[400px]">
          <div>
            <h1 className="text-5xl font-extrabold text-[#F06060] text-center md:text-left">
              Sweete
            </h1>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex-1  shadow-lg rounded-lg p-4 bg-white flex flex-col gap-2">
              <p className="text-md mt-2 text-start md:text-left mb-4">
                Sweete help you connect and shared with everyone in your life
              </p>
              <form
                className="flex flex-col gap-[12px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  placeholder="Email or phone number"
                  className="focus:border-[#F06060] focus:outline focus:outline-[#F06060] p-2 rounded-md border"
                  {...register("account", { required: true })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="focus:border-[#F06060] focus:outline focus:outline-[#F06060] p-2 rounded-md border"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  className="bg-[#F06060] text-white rounded-md py-2"
                  type="submit"
                >
                  {
                    isLoggingIn ? <Spinner /> : "Log in"
                  }
                </button>
              </form>
              <p className="text-sm underline text-blue-500 text-center">
                Forgot password?
              </p>
              <hr className="my-2" />
              <div className="flex justify-center">
                <button
                  onClick={() => redirect("/register")}
                  className="bg-[#0CB8AE] rounded-md p-2 text-white w-full lg:w-1/2 cursor-pointer"
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNoti.show && (
        <ModalNotify
          header={
            <div>
              <p
                className={`text-md text-center font-bold text-xl ${
                  showNoti.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            </div>
          }
          body={
            <div>
              <DotLottieReact
                src={`${
                  showNoti.success
                    ? "https://lottie.host/6a981610-55cb-464f-bf36-7e72ad608b1f/Uo6GlqDnXd.lottie"
                    : "https://lottie.host/a156826c-15f3-45fc-8f1c-919d1a5c4a6b/GxeVyC0Dcn.lottie"
                }`}
                loop
                autoplay
              />
            </div>
          }
          show={showNoti}
          handleClose={() => setShowNoti({ ...showNoti, show: false })}
        />
      )}
    </div>
  );
}
