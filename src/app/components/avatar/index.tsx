import React from 'react';
import { UserInfoLS } from "@/models";
import { AvatarDefault } from '@/constant';

function AvatarUser(props: {
    userInfo?: UserInfoLS,
    path: string,
    shape?: "circle" | "square",
}) {
    const { userInfo, path, shape = "circle" } = props;
    return (
        <img
            src={
                `${path || AvatarDefault}`
            }
            alt="avatar"
            className={`object-cover ${shape !== "circle" ? "rounded-2" : "rounded-full"} w-100 h-100`}
        />
    );
}

export default AvatarUser;