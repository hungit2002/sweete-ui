import React, {useEffect, useState} from 'react';
import {faBriefcase, faGraduationCap, faHeart, faHome, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppSelector} from "@/lib/hooks";
import Attendance from "@/app/Modules/User/Attendance";
import {fetchFriends, getUserImages} from "@/Services/userService";
import Loading from "@/app/components/Loading/Loading";
import {Friend} from "@/models";

const Post = () => {
    const userInfo: any = useAppSelector(state => state?.user?.user);
    const [images, setImages] = useState<Image[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [friends, setFriends] = useState<Friend[]>([])
    const [isLoadingFriend, setIsLoadingFriend] = useState<boolean>(false)

    const fetchUserImages = () => {
        setIsLoading(true)
        getUserImages(userInfo?.id, {
            page: 1,
            per_page: 9
        }).then((response: any) => {
            setIsLoading(false)
            if (response?.data?.meta?.code === 200) {
                setImages(response?.data?.result?.data);
            }
        }).catch((error) => {
            setIsLoading(false)
            console.log(error);
        })
    }

    const fetchUserFriends = () => {
        setIsLoadingFriend(true)
        fetchFriends(userInfo?.id, 9).then((response: any) => {
            setIsLoadingFriend(false)
            if (response?.data?.meta?.code === 200) {
                setFriends(response?.data?.result?.data);
            }
        }).catch((error) => {
            setIsLoadingFriend(false)
            console.log(error);
        })
    }

    useEffect(() => {
        if (userInfo?.id) {
            fetchUserImages();
            fetchUserFriends();
        }
    }, [userInfo?.id])
    console.log(images)
    return (
        <div className={"row"}>
            <div className={"col-lg-5 flex flex-col gap-2"}>
                <div className={"rounded-3 border-1 container"}>
                    <h1 className='text-2xl font-bold my-3'>Introduce</h1>
                    <button
                        className="mb-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center w-full">Add
                        biography
                    </button>
                    <table>
                        <tbody>
                        <tr>
                            <td className='flex justify-center pe-2 py-2'>
                                <FontAwesomeIcon icon={faBriefcase} size={"lg"} color={"#979DA7"}/>
                            </td>
                            <td className='ps-2 py-2'>
                                Làm việc tại <strong>Hà Nội</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex justify-center pe-2 py-2'>
                                <FontAwesomeIcon icon={faGraduationCap} size={"lg"} color={"#979DA7"}/>
                            </td>
                            <td className='ps-2 py-2'>
                                Đã học tại <strong>Trường THPT Mỹ Đức C</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex justify-center pe-2 py-2'>
                                <FontAwesomeIcon icon={faHome} size={"lg"} color={"#979DA7"}/>
                            </td>
                            <td className='ps-2 py-2'>
                                Sống tại <strong>Hà Nội</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex justify-center pe-2 py-2'>
                                <FontAwesomeIcon icon={faLocationDot} size={"lg"} color={"#979DA7"}/>
                            </td>
                            <td className='ps-2 py-2'>
                                Đến từ <strong>Hà Nội</strong>
                            </td>
                        </tr>
                        <tr>
                            <td className='flex justify-center pe-2 py-2'>
                                <FontAwesomeIcon icon={faHeart} size={"lg"} color={"#979DA7"}/>
                            </td>
                            <td className='ps-2 py-2'>
                                Độc thân
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button
                        className="my-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center w-full">Edit
                        more
                    </button>
                    <Attendance userInfo={userInfo}/>
                </div>
                <div className={"rounded-3 border-1 container"}>
                    <div className={"flex justify-between items-center"}>
                        <h1 className={"text-2xl font-bold my-3"}>Images</h1>
                        <a href={"#"} className={"text-blue-500"}>View all images</a>
                    </div>
                    <div className={"grid grid-cols-3 gap-1"}>
                        {
                            isLoading ? (<Loading/>) : (
                                images?.map((image: any, index: number) => (
                                    <div key={index} className={"relative h-[130px]"}>
                                        <img src={image?.path} alt={image?.origin_name}
                                             className={"w-full h-full object-cover"}/>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className={"rounded-3 border-1 container"}>
                    <div className={"flex justify-between items-center"}>
                        <h1 className={"text-2xl font-bold my-3"}>Friends</h1>
                        <a href={"#"} className={"text-blue-500"}>View all friends</a>
                    </div>
                    <div className={"grid grid-cols-3 gap-1"}>
                        {
                            isLoadingFriend ? (<Loading/>) : (
                                friends?.map((friend: Friend, index: number) => (
                                    <div key={index} className={"relative h-[130px]"}>
                                        <img src={friend?.user?.avatar} alt={friend?.user?.full_name}
                                             className={"w-full h-full object-cover"}/>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={"col-lg-7"}>
            </div>
        </div>
    );
};

export default Post;