import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FriendTab from "@/app/Modules/User/FriendTab/FriendTab";
import {UserInfoMD} from "@/models";
import Post from "@/app/Modules/User/Post/Post";

const TabsUserDetail = (props:{
    userInfoMD: UserInfoMD,
}) => {
    const {userInfoMD} = props;
    return (
        <Tabs
            defaultActiveKey="post"
            id="uncontrolled-tab-example"
            className="mb-3"
            variant={"underline"}
            style={{
                fontSize: "14px",
            }}
        >
            <Tab eventKey="post" title="Post">
                <Post/>
            </Tab>
            <Tab eventKey="introduce" title="Introduce">
                Tab content for Introduce
            </Tab>
            <Tab eventKey="friend" title="Friends">
                <FriendTab userInfoMD={userInfoMD} />
            </Tab>
        </Tabs>
    );
};

export default TabsUserDetail;