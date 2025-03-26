"use client"

import AvatarUser from '@/app/components/avatar'
import Header from '@/app/layouts/header'
import {fetchUserDetail, updatePoster} from '@/Services/userService'
import {faCamera, faChevronDown, faImages, faPencil, faPlus, faTrash, faUpload} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {redirect, useSearchParams} from 'next/navigation'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {toast} from 'react-toastify'
import TabsUserDetail from "@/app/Modules/User/TabsUserDetail";
import {OverlayTrigger, Popover, PopoverBody} from "react-bootstrap";
import {uploadImage} from "@/Services/mediaService";
import {setUser} from "@/lib/features/user/userSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

export default function UserDetail() {
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const userInfo: any = useAppSelector(state => state.user.user)

    const userID = searchParams.get('id')

    const [posterTmp, setPosterTmp] = useState<any>(null)
    const getUserDetail = () => {
        if (userID) {
            fetchUserDetail(Number(userID)).then((res: any) => {
                if (res?.data?.meta?.code === 200) {
                    dispatch(setUser(res?.data?.result))
                } else {
                    toast.error("Fail in response")
                }
            }).catch((err: any) => {
                toast.error("Server error")
                console.log(err);
            })
        }
    }

    const handleClickUploadPoster = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();
        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPosterTmp({
                    file,
                    url: URL.createObjectURL(file),
                });
            };
        };
    }

    const handleClickSavePoster = () => {
        uploadImage(posterTmp?.file, "poster").then((res: any) => {
            if (res?.data?.meta?.code === 200) {
                return res?.data?.result
            } else {
                toast.error("Fail to upload image")
            }
        })
            .then((image: any) => {
                const data = {
                    user_id: userID,
                    url: image.secure_url,
                    size: image.bytes,
                    type: image.format,
                    name: image.original_filename,
                }
                updatePoster(data).then((res: any) => {
                    if (res?.data?.meta?.code === 200) {
                        const newUser = {
                            ...userInfo,
                            poster: res?.data?.result?.path
                        }
                        dispatch(setUser(newUser))
                        toast.success("Change poster success")
                    } else {
                        toast.error("Fail to change poster")
                    }
                }).catch((err: any) => {
                    toast.error("Fail to change poster")
                    console.log(err);
                })
            })
            .catch((err: any) => {
                toast.error("Fail to change poster")
                console.log(err);
            })
    }

    useEffect(() => {
        getUserDetail();
    }, [userID])

    return (
        <div>
            <Header/>
            <div className='container'>
                <div
                    style={{
                        backgroundImage: `url("${posterTmp?.url || userInfo?.poster?.path || "https://static-cse.canva.com/blob/1126190/poster.jpg"}")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}
                    className='w-full min-h-[200px] lg:min-h-[400px] rounded-b-md relative'
                >
                    <div
                        className='absolute bottom-0 left-0 right-0 lg:mx-auto -mb-32 lg:-mb-24 px-4 flex flex-col items-center lg:flex-row lg:justify-between lg:items-end'>
                        <div className='flex gap-2 items-center flex-col lg:flex-row lg:items-end'>
                            <div className='w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] rounded-full bg-white'>
                                <AvatarUser path={userInfo?.avatar}/>
                            </div>
                            <div className='flex flex-col gap-0 items-center lg:items-start'>
                                <p className='font-bold text-xl'>{userInfo?.full_name}</p>
                                <p className='font-thin text-sm mb-1'>{userInfo?.friends?.length} friends</p>
                                <div className='flex items-center gap-1 mb-1'>
                                    {
                                        userInfo?.friends?.slice(0, 8)?.map((friend: any, index: number) => {
                                            return (
                                                <div key={index}
                                                     className="w-[30px] h-[30px] rounded-full bg-white border cursor-pointer"
                                                     onClick={() => {
                                                         redirect(`/user-detail?id=${friend?.user?.id}`)
                                                     }}>
                                                    <AvatarUser key={index} path={friend?.user?.avatar}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-row items-end gap-2"}>
                            <div className={"flex gap-2 items-center"}>
                                <button className={"font-bold text-white bg-blue-500 p-2 rounded"}>
                                    <FontAwesomeIcon icon={faPlus} color={"white"} size={"sm"} className={"me-2"}/>
                                    Add news
                                </button>
                                <button className={"font-bold text-black bg-gray-300 p-2 rounded"}>
                                    <FontAwesomeIcon icon={faPencil} color={"black"} size={"sm"} className={"me-2"}/>
                                    Edit personal profile
                                </button>
                            </div>
                            <div className={"py-2 bg-gray-300 px-4 rounded border"}>
                                <FontAwesomeIcon icon={faChevronDown} color={"black"} size={"sm"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"absolute right-0 bottom-0 flex items-center"}>
                        <OverlayTrigger rootClose overlay={<Popover id="popover-action-poster"
                        >
                            <PopoverBody>
                                <ul className={"flex flex-col gap-3"}>
                                    <li className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}>
                                        <FontAwesomeIcon icon={faImages} size={"sm"} color={"green"}/>
                                        <p className={"text-sm"}>Select poster</p>
                                    </li>
                                    <li
                                        onClick={handleClickUploadPoster}
                                        className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}>
                                        <FontAwesomeIcon icon={faUpload} size={"sm"} color={"orange"}/>
                                        <p className={"text-sm"}>Upload poster</p>
                                    </li>
                                    <li className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}>
                                        <FontAwesomeIcon icon={faTrash} size={"sm"} color={"red"}/>
                                        <p className={"text-sm"}>Remove poster</p>
                                    </li>
                                </ul>
                            </PopoverBody>
                        </Popover>} trigger={"click"} placement={"bottom-start"}>
                            <div
                                className='px-3 py-1 rounded-md bg-slate-100 mr-2 mb-2 text-white shadow-md cursor-pointer flex items-center justify-center gap-2'>
                                <FontAwesomeIcon icon={faCamera} color='black'/>
                                <p className={"text-black text-sm"}>Edit poster</p>
                            </div>
                        </OverlayTrigger>
                        {
                            posterTmp && (
                                <div
                                    onClick={handleClickSavePoster}
                                    className='px-3 py-1 rounded-md bg-blue-500 mr-2 mb-2  shadow-md cursor-pointer flex items-center justify-center gap-2'>
                                    <p className={"text-white text-sm"}>Save</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"mt-[150px]"}>
                    <hr/>
                    <br/>
                    <TabsUserDetail userInfoMD={userInfo}/>
                </div>
            </div>
        </div>
    )
}
