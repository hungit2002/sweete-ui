"use client";
import Header from "@/app/layouts/header";
import isAuthenticated from "@/Utils/Auth";
import {redirect} from "next/navigation";
import {useLayoutEffect, useState} from "react";
import SideLeft from "@/app/Modules/Home/Layouts/SideLeft";
import SideRight from "@/app/Modules/Home/Layouts/SideRight";
import HomeFeeds from "@/app/Modules/Home/Layouts/HomeFeeds";

export default function Home() {
    const [userInfo, setUserInfo] = useState<any>(null);
    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login");
        }

        const user = JSON.parse(localStorage.getItem("user_info") || "{}");
        setUserInfo(user);
    }, []);
    return (
        <div className="bg-white h-[100vh] overflow-y-hidden">
            <Header/>
            <div className="grid grid-cols-4 gap-8">
                <div className="flex-1">
                    <SideLeft userInfo={userInfo}/>
                </div>
                <div className="flex-1 container col-span-2 overflow-y-auto h-[calc(100vh-56px)] no-scrollbar">
                    <HomeFeeds userInfo={userInfo}/>
                </div>
                <div className="flex-1">
                    <SideRight/>
                </div>
            </div>
        </div>
    );
}
