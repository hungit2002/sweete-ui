import React from 'react';
import {UserInfoMD} from "@/models";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AvatarUser from "@/app/components/avatar";
import {dateToMMDDYYYY} from "@/Utils/Date";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";

const FriendTab = (props: {
    userInfoMD: UserInfoMD;
}) => {
    const {userInfoMD} = props;
    return (
        <div className={"rounded-2 border py-2 px-3"}>
            <div className={"flex items-center justify-between"}>
                <h1 className={"font-bold"}>Friends</h1>
                <div className={"flex items-center gap-4"}>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search"/>
                    <p className={"text-blue-500 font-bold hover:underline cursor-pointer"}>Friend invitation</p>
                    <p className={"text-blue-500 font-bold hover:underline cursor-pointer"}>Search Friend</p>
                    <p className={"text-blue-500 font-bold hover:underline cursor-pointer"}>Invite friends</p>
                </div>
            </div>
            <div className={"p-2"}>
                <Tabs
                    defaultActiveKey="all_friends"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    variant={"underline"}
                    style={{
                        fontSize: "14px",
                    }}
                >
                    <Tab eventKey="all_friends" title="All friends">
                        <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                            {
                                userInfoMD?.friends?.map((friend,index: number) =>
                                    <div className={"flex items-center justify-between gap-3 p-2"}>
                                        <div className={"flex items-center gap-3"}>
                                            <div className={"w-[50px] h-[50px] rounded-2 border"}>
                                                <AvatarUser shape={"square"} path={friend?.user?.avatar || ""}/>
                                            </div>
                                            <div className={"flex flex-col"}>
                                                <p className={"font-bold text-sm hover:underline cursor-pointer"}>{friend?.user?.full_name}</p>
                                                <p className={"font-light text-xs hover:underline cursor-pointer"}>{friend?.user?.dob ? dateToMMDDYYYY(friend?.user?.dob) : "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className={"px-2 py-1 hover:bg-gray-200 cursor-pointer"}>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="recent" title="Recent Added">
                        Tab content for Profile
                    </Tab>
                    <Tab eventKey="dob" title="Date of Birth">
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default FriendTab;