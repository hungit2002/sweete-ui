"use client"

import AvatarUser from '@/app/components/avatar'
import Header from '@/app/layouts/header'
import { fetchUserDetail } from '@/Services/userService'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

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
            <Header />
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
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
