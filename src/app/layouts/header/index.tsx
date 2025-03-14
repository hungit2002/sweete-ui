"use client";
import isAuthenticated from "@/Utils/Auth";
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";
import {
    faBell,
    faHome,
    faSearch,
    faStoreAlt,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {redirect, usePathname} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import AvatarUser from "@/app/components/avatar";
import {OverlayTrigger, Popover} from "react-bootstrap";

export default function Header() {
    const path = usePathname();

    const [userInfo, setUserInfo] = useState<any>(null);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [inputSearch, setInputSearch] = useState<string>("");
    const [inputSearchValue] = useDebounce(inputSearch, 500);

    useEffect(() => {
    }, [inputSearchValue])


    useLayoutEffect(() => {
        const isAuth = isAuthenticated();
        if (!isAuth) {
            redirect("/login");
        }
        const user = JSON.parse(localStorage.getItem("user_info") || "{}");
        setUserInfo(user);
    }, []);
    return (
        <div className="h-[56px] border-b flex items-center justify-between px-2 bg-white">
            <div className="flex items-center gap-2">
                <div
                    className="text-3xl font-extrabold text-white bg-default border rounded-full p-2 w-[47px] h-[47px] flex justify-center items-center">
                    S
                </div>

                <OverlayTrigger
                    overlay={
                        <Popover id={"popover-search"}>
                            <div className={"mt-1"}>
                                <div>
                                    <input
                                        type="text"
                                        value={inputSearch}
                                        placeholder={"Enter your search"}
                                        onChange={(e) => setInputSearch(e.target.value)}
                                        className={"w-[200px] h-[40px]rounded-md p-2"}/>
                                </div>
                            </div>
                        </Popover>
                    }
                    placement={"bottom-start"}
                    trigger={"click"}
                    rootClose
                >
                    <div className={"w-[40px] h-[40px] bg-gray-200 rounded-full flex justify-center items-center"}>
                        <FontAwesomeIcon icon={faSearch} color={"#7777777"}/>
                    </div>
                </OverlayTrigger>
            </div>
            <ul className="flex gap-2 items-center h-100 py-1">
                <li className="min-w-[90px] h-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md relative">
                    <Link
                        href="/home"
                        aria-label="Home"
                        className="flex w-100 h-100 items-center justify-center"
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faHome}
                                size="lg"
                                color={path === "/(home)" ? "#F06060" : "#65686c"}
                            />
                        </div>
                    </Link>
                    {path === "/(home)" && (
                        <div className="absolute -bottom-0 h-[2px] bg-default w-full"></div>
                    )}
                </li>
                <li className="min-w-[90px] h-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md relative">
                    <Link
                        href="/market"
                        aria-label="Market"
                        className="flex w-100 h-100 items-center justify-center"
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faStoreAlt}
                                size="lg"
                                color={path === "/market" ? "#F06060" : "#65686c"}
                            />
                        </div>
                    </Link>
                    {path === "/market" && (
                        <div className="absolute -bottom-0 h-[2px] bg-default w-full"></div>
                    )}
                </li>
                <li className="min-w-[90px] h-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer rounded-md relative">
                    <Link
                        href="/messages"
                        aria-label="Messages"
                        className="flex w-100 h-100 items-center justify-center"
                    >
                        <div>
                            <FontAwesomeIcon
                                icon={faFacebookMessenger}
                                size="lg"
                                color={path === "/messages" ? "#F06060" : "#65686c"}
                            />
                        </div>
                    </Link>
                    {path === "/messages" && (
                        <div className="absolute -bottom-0 h-[2px] bg-default w-full"></div>
                    )}
                </li>
            </ul>
            <div className="flex gap-2 items-center">
                <div className="w-[40px] h-[40px] bg-infos border rounded-full p-2 flex justify-center items-center">
                    <FontAwesomeIcon icon={faBell} size="lg" color="#65686c"/>
                </div>
                <div className="w-[40px] h-[40px] bg-infos rounded-full flex justify-center items-center">
                    <AvatarUser path={userInfo?.avatar}/>
                </div>
            </div>
        </div>
    );
}
