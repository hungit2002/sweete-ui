import React from 'react';
import SideMenuItem from "@/app/Modules/Home/Layouts/SideLeft/SideMenuItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faSearch} from "@fortawesome/free-solid-svg-icons";

function SideRight(props: {}) {
    return (
        <div>
            <div className={"flex items-center justify-between py-2 px-2"}>
                <p className={"font-bold text-secondary text-sm"}>
                    Contact Persons
                </p>
                <div className={"flex items-center gap-2"}>
                    <div className={"flex justify-center items-center hover:bg-gray-200 rounded-full h-[36px] w-[36px] cursor-pointer"}>
                        <FontAwesomeIcon icon={faSearch} color={"#777"}/>
                    </div>
                    <div className={"flex justify-center items-center hover:bg-gray-200 rounded-full h-[36px] w-[36px] cursor-pointer"}>
                        <FontAwesomeIcon icon={faEllipsis} color={"#777"}/>
                    </div>
                </div>
            </div>
            <div>
                {
                    Array.from({length: 10}).map((_, index) => (
                        <SideMenuItem
                            key={index}
                            icon={
                                <img
                                    className={"object-cover h-100 w-100 rounded-full"}
                                    src={"https://img.freepik.com/free-photo/young-bearded-man-with-white-t-shirt_273609-7194.jpg?semt=ais_hybrid"}
                                />
                            }
                            label={"Lewen"}
                        />
                    ))
                }
            </div>
            <hr className={"my-2"}/>
            <div className={"mt-3"}>
                <p className={"font-bold text-secondary text-sm"}>
                    Group chats
                </p>
            </div>
        </div>
    );
}

export default SideRight;