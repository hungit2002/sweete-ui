"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function Register() {
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center flex-col">
      <div className="container flex flex-col items-center gap-8">
        <h1 className="text-pink-500 text-4xl">Sweete</h1>
        <div className="flex-1 shadow-lg rounded-lg p-4 bg-white flex flex-col gap-2">
          <h2>Create a new account</h2>
          <p>It's quick and easy.</p>
          <form>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="border p-2 rounded-md" type="text" placeholder="First name"/>
              <input className="border p-2 rounded-md" type="text" placeholder="Surname"/>
            </div>
            <div>
              <label>Date of birth</label>
              <div className="grid md:grid-cols-3 my-2 gap-2">
                <select className="p-2 bg-white border rounded-md">
                  {
                    Array.from({ length: 31 }, (_, index) => index + 1).map((day:any) => <option>{day}</option>)
                  }
                </select>
                <select className="p-2 bg-white border rounded-md">
                  {
                    Array.from({ length: 12 }, (_, index) => index + 1).map((month:any) => <option>{month}</option>)
                  }
                </select>
                <select className="p-2 bg-white border rounded-md">
                  {
                    Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, index) => new Date().getFullYear() - index).map((day:any) => <option>{day}</option>)
                  }
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
