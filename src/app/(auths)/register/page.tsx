"use client";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
interface IFormRegisterInput {
  first_name: string;
  surname: string;
  day: number;
  month: number;
  year: number;
  gender: number;
  mobile_or_email: string;
  password: string;
}
export default function Register() {
  const { register, handleSubmit } = useForm<IFormRegisterInput>();
  const onSubmit = (data: IFormRegisterInput) => {
    console.log(data);
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-start flex-col overflow-y-auto pt-8">
      <div className="container flex flex-col items-center gap-8">
        <h1 className="text-default text-5xl font-extrabold">Sweete</h1>
        <div className="flex-1 shadow-lg rounded-lg p-4 bg-white flex flex-col gap-2 max-w-[500px]">
          <div className="flex flex-col gap-1">
            <h2 className="text-center text-xl font-bold">
              Create a new account
            </h2>
            <p className="text-center">It's quick and easy.</p>
          </div>
          <hr />
          <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label>
                Username <span className="text-danger">*</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="First name"
                  {...register("first_name", { required: true })}
                />
                <input
                  className="border p-2 rounded-md"
                  type="text"
                  placeholder="Surname"
                  {...register("surname", { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                Date of birth <span className="text-danger">*</span>
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                <select
                  className="p-2 bg-white border rounded-md"
                  {...register("day", { required: true })}
                >
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (day: any, index: number) => (
                      <option key={index}>{day}</option>
                    )
                  )}
                </select>
                <select
                  className="p-2 bg-white border rounded-md"
                  {...register("month", { required: true })}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (month: any, index: number) => (
                      <option key={index}>{month}</option>
                    )
                  )}
                </select>
                <select
                  className="p-2 bg-white border rounded-md"
                  {...register("year", { required: true })}
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, index) => new Date().getFullYear() - index
                  ).map((day: any, index: number) => (
                    <option key={index}>{day}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>
                Gender <span className="text-danger">*</span>
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                <label className="border p-2 rounded-md flex items-center justify-between gap-2">
                  <p> Female </p>
                  <input
                    id="female"
                    type="radio"
                    {...register("gender", { required: true })}
                    value={0}
                  />
                </label>
                <label className="border p-2 rounded-md flex items-center justify-between gap-2">
                  <p> Male </p>
                  <input
                    id="male"
                    type="radio"
                    {...register("gender", { required: true })}
                    value={1}
                  />
                </label>
                <label className="border p-2 rounded-md flex items-center justify-between gap-2">
                  <p> Custom </p>
                  <input
                    id="custom"
                    type="radio"
                    {...register("gender", { required: true })}
                    value={2}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="border p-2 rounded-md"
                type="text"
                placeholder="Mobile number or email"
                {...register("mobile_or_email", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="border p-2 rounded-md"
                type="password"
                placeholder="New password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="w-100">
              <p className="text-xs">
                People who use our service may have uploaded your contact
                information to Facebook.
              </p>
              <p className="text-xs mt-2">
                By clicking Sign Up, you agree to our Terms, Privacy Policy and
                Cookies Policy. You may receive SMS notifications from us and
                can opt out at any time.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#0CB8AE] text-white rounded-md py-2 w-full lg:w-1/2"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <a onClick={() => redirect("/login")} className="text-blue-500 underline cursor-pointer">
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
