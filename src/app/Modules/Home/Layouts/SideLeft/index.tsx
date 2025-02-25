import React, {useState} from 'react';
import {UserInfoLS} from "@/models";
import SideMenuItem from "@/app/Modules/Home/Layouts/SideLeft/SideMenuItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faFloppyDisk,
    faNewspaper,
    faStore,
    faUserFriends,
    faUserGroup,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons";

const menuSideLeft = [
    {icon: <FontAwesomeIcon icon={faUserFriends} size={"lg"} color={"#197FE9"}/>, label: "Friends"},
    {icon: <FontAwesomeIcon icon={faFloppyDisk} size={"lg"} color={"#CC38B0"}/>, label: "Saved"},
    {icon: <FontAwesomeIcon icon={faUserGroup} size={"lg"} color={"#40B3CD"}/>, label: "Groups"},
    {icon: <FontAwesomeIcon icon={faVideo} size={"lg"} color={"#40B3CD"}/>, label: "Video"},
    {icon: <FontAwesomeIcon icon={faStore} size={"lg"} color={"#40B3CD"}/>, label: "Marketplace"},
    {icon: <FontAwesomeIcon icon={faNewspaper} size={"lg"} color={"#40B3CD"}/>, label: "Feed Boards"},
    {icon: <FontAwesomeIcon icon={faFacebookMessenger} size={"lg"} color={"#CC38B0"}/>, label: "Messenger"},
];

function SideLeft({userInfo}: { userInfo: UserInfoLS }) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const visibleItems = isExpanded ? menuSideLeft : menuSideLeft.slice(0, 5);

    return (
        <div className="py-2 px-1 flex flex-col">
            {/* Avatar & Fullname */}
            <SideMenuItem
                icon={
                    <img className="object-cover h-100 w-100 rounded-full"
                         src={userInfo?.avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg"}
                         alt="User Avatar"/>
                }
                label={userInfo?.fullname || "Fullname"}
                userID = {userInfo?.id}
            />

            {/* Render danh sách menu */}
            {visibleItems.map((item, index) => (
                <SideMenuItem key={index} icon={item.icon} label={item.label}/>
            ))}

            {/* Nút See More / See Less */}
            {menuSideLeft.length > 5 && (
                <div className="flex gap-2 items-center hover:bg-gray-100 cursor-pointer rounded py-2 px-3"
                     onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="w-[32px] h-[32px] flex justify-center items-center bg-gray-200 rounded-full">
                        {
                            isExpanded
                                ? <FontAwesomeIcon icon={faChevronUp} color={"#777"}/>
                                : <FontAwesomeIcon icon={faChevronDown} color={"#777"}/>
                        }

                    </span>
                    <p className="font-bold text-sm">{isExpanded ? "See Less" : "See More"}</p>
                </div>
            )}
        </div>
    );
}

export default SideLeft;
