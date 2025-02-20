import React from 'react';

function SideMenuItem(props: {
    icon: any,
    label: string,
}) {
    const {icon, label} = props;
    return (
        <div className={"flex gap-2 items-center hover:bg-gray-100 cursor-pointer rounded py-2 px-3"}>
            <span className={"w-[34px] h-[34px] flex justify-center items-center"}>{icon}</span>
            <p className={"font-bold text-sm"}>{label}</p>
        </div>
    );
}

export default SideMenuItem;