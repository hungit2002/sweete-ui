import React from 'react';
import {UserInfoLS} from "@/models";

function AvatarUser(props: {
    userInfo: UserInfoLS,
}) {
    const {userInfo} = props;
    return (
        <img
            src={
                `${userInfo?.avatar}` ||
                "https://www.svgrepo.com/show/452030/avatar-default.svg"
            }
            alt="avatar"
            className="object-cover rounded-full w-100 h-100"
        />
    );
}

export default AvatarUser;