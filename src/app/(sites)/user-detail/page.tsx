"use client"

import AvatarUser from '@/app/components/avatar'
import Header from '@/app/layouts/header'
import {fetchUserDetail} from '@/Services/userService'
import {faCamera, faChevronDown, faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {redirect, useSearchParams} from 'next/navigation'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {toast} from 'react-toastify'
import TabsUserDetail from "@/app/Modules/User/TabsUserDetail";

export default function UserDetail() {
    const searchParams = useSearchParams()

    const userID = searchParams.get('id')

    const [userInfo, setUserInfo] = useState<any>(null)
    const getUserDetail = () => {
        if (userID) {
            fetchUserDetail(Number(userID)).then((res: any) => {
                if (res?.data?.meta?.code === 200) {
                    setUserInfo(res?.data?.result)
                } else {
                    toast.error("Fail in response")
                }
            }).catch((err: any) => {
                toast.error("Server error")
                console.log(err);
            })
        }
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
                        backgroundImage: `url("${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHUWwHM-PunwonLK2duC-tbNwjweEo4h66Q&s"}")`,
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
                                        userInfo?.friends?.slice(0,8)?.map((friend: any, index: number) => {
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
                    <div
                        className='px-3 py-1 rounded-md bg-slate-100 absolute right-0 bottom-0 mr-2 mb-2 text-white shadow-md cursor-pointer'>
                        <FontAwesomeIcon icon={faCamera} color='black'/>
                    </div>
                </div>
                <div className={"mt-[150px]"}>
                    <hr/>
                    <br/>
                    <TabsUserDetail userInfoMD={userInfo} />
                </div>
            </div>
        </div>
    )
}
