"use client";
import { login } from "@/Services/authServices";
import { redirect } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data.email,data.password).then((res:any) => {
      console.log("res",res);
      
    }).catch((err) => {
      alert(JSON.stringify(err))
    })
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center">
      <div className="container max-w-[80%]">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h1 className="text-5xl text-pink-500">Sweete</h1>
            <p className="text-lg mt-2">
              Sweete help you connect and shared with everyone in your life
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex-1 max-w-[400px] shadow-lg rounded-lg p-4 bg-white flex flex-col gap-2">
              <form className="flex flex-col gap-[12px]" onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Email or phone number"
                  className="focus:border-pink-500 focus:outline focus:outline-pink-500 p-2 rounded-md border"
                  {...register("email", { required: true })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="focus:border-pink-500 focus:outline focus:outline-pink-500 p-2 rounded-md border"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button className="bg-pink-500 text-white rounded-md py-2" type="submit">
                  Login
                </button>
              </form>
              <p className="text-sm underline text-blue-500 text-center">
                Forgot password?
              </p>
              <hr className="my-2" />
              <div className="flex justify-center">
                <button
                  onClick={() => redirect("/register")}
                  className="bg-green-600 rounded-md p-2 text-white w-1/2 cursor-pointer"
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
