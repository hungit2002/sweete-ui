"use client"

import AvatarUser from '@/app/components/avatar'
import Header from '@/app/layouts/header'
import { fetchUserDetail, updatePoster } from '@/Services/userService'
import { faCamera, faChevronDown, faImages, faPencil, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { redirect, useSearchParams } from 'next/navigation'
import React, {use, useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import TabsUserDetail from "@/app/Modules/User/TabsUserDetail";
import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap";
import { uploadImage } from "@/Services/mediaService";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ModalSelectPoster from '@/app/components/post/Modals/ModalSelectPoster';
import { getUserImages } from '@/Services/userService';
import {PostFormBody} from "@/models";
import {createPost} from "@/Services/postService";

export default function UserDetail() {
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const userInfo: any = useAppSelector(state => state.user.user)

    const userID = searchParams.get('id')

    const [posterTmp, setPosterTmp] = useState<any>(null)
    const [showModalSelectPoster, setShowModalSelectPoster] = useState<boolean>(false);
    const [userImages, setUserImages] = useState<any[]>([]);
    const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isShareToNewBoard, setIsShareToNewBoard] = useState<boolean>(false);

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

    const handleClickSavePoster = async () => {
        try {
            const uploadRes = await uploadImage(posterTmp?.file, "poster");
            if (uploadRes?.data?.meta?.code === 200) {
                const image = uploadRes?.data?.result;
                const data = {
                    user_id: userID,
                    url: image.secure_url,
                    size: image.bytes,
                    type: image.format,
                    name: image.original_filename,
                };
                
                const posterRes = await updatePoster(data);
                if (posterRes?.data?.meta?.code === 200) {
                    const newUser = {
                        ...userInfo,
                        poster: {
                            path: posterRes?.data?.result?.path
                        }
                    };
                    dispatch(setUser(newUser));
                    setPosterTmp(null);
                    toast.success("Change poster success");
                } else {
                    toast.error("Failed to change poster");
                }
            } else {
                toast.error("Failed to upload image");
            }
        } catch (err) {
            toast.error("Failed to change poster");
            console.log(err);
        }
    };

    // Cập nhật hàm handleOpenSelectPoster
    const handleOpenSelectPoster = async () => {
        setShowModalSelectPoster(true);
        setIsLoadingImages(true);
        try {
            const res = await getUserImages(Number(userID), {
                page: currentPage,
                per_page: 8
            });
            if (res?.data?.meta?.code === 200) {
                setUserImages(res?.data?.result?.data || []);
                setTotalPages(res?.data?.result?.total_pages || 1);
            }
        } catch (error) {
            toast.error("Failed to load images");
            console.log(error);
        }
        setIsLoadingImages(false);
    };

    // Thêm hàm xử lý khi chuyển trang
    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        setIsLoadingImages(true);
        try {
            const res = await getUserImages(Number(userID), {
                page: page,
                per_page: 8
            });
            if (res?.data?.meta?.code === 200) {
                setUserImages(res?.data?.result?.data || []);
            }
        } catch (error) {
            toast.error("Failed to load images");
            console.log(error);
        }
        setIsLoadingImages(false);
    };

    const handleSelectImage = (imageId: number) => {
        const selectedImage = userImages.find(img => img.id === imageId);
        if (selectedImage) {
            const data = {
                user_id: userID,
                url: selectedImage.path,
                size: selectedImage.size,
                type: selectedImage.type,
                name: selectedImage.origin_name,
            };
            updatePoster(data).then((res: any) => {
                if (res?.data?.meta?.code === 200) {
                    const newUser = {
                        ...userInfo,
                        poster: {
                            path: res?.data?.result?.path
                        }
                    };
                    setPosterTmp(null);
                    if (isShareToNewBoard){
                        createPostUpdatePoster(res?.data?.result);
                    }
                    dispatch(setUser(newUser));
                    toast.success("Change poster success");
                    setShowModalSelectPoster(false); // Thêm dòng này để đóng modal sau khi chọn
                } else {
                    toast.error("Failed to change poster");
                }
            }).catch((err: any) => {
                toast.error("Failed to change poster");
                console.log(err);
            });
        }
    };

    const createPostUpdatePoster = async (image: any) => {
        const data : PostFormBody = {
            user_id: Number(userID),
            content: `${userInfo?.full_name} just changed cover photo`,
            images: [
                {
                    url: image?.path,
                    name: image.origin_name,
                    size: image.size,
                    type: image.type,
                    note: "",
                    friends: []
                }
            ],
            friends: [],
            status: {
                type: 0,
                friends_expect: [],
                friends_specific: []
            },
            checkin: "{}",
            background: "{\"bg\":\"\",\"text\":\"text-gray-900\"}",
            gifs: [],
        }
        createPost(data).then((res: any) => {
            if (res?.data?.meta?.code === 200) {
                toast.success("Create post success");
            } else {
                toast.error("Failed to create post");
            }
        }).catch((err: any) => {
            toast.error("Failed to create post");
            console.log(err);
        })
    }

    useEffect(() => {
        getUserDetail();
    }, [userID])

    return (
        <>
            <div>
                <Header />
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
                                    <AvatarUser path={userInfo?.avatar} />
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
                                                        <AvatarUser key={index} path={friend?.user?.avatar} />
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
                                        <FontAwesomeIcon icon={faPlus} color={"white"} size={"sm"} className={"me-2"} />
                                        Add news
                                    </button>
                                    <button className={"font-bold text-black bg-gray-300 p-2 rounded"}>
                                        <FontAwesomeIcon icon={faPencil} color={"black"} size={"sm"} className={"me-2"} />
                                        Edit personal profile
                                    </button>
                                </div>
                                <div className={"py-2 bg-gray-300 px-4 rounded border"}>
                                    <FontAwesomeIcon icon={faChevronDown} color={"black"} size={"sm"} />
                                </div>
                            </div>
                        </div>
                        <div className={"absolute right-0 bottom-0 flex items-center"}>
                            <OverlayTrigger rootClose overlay={<Popover id="popover-action-poster"
                            >
                                <PopoverBody>
                                    <ul className={"flex flex-col gap-3"}>
                                        <li
                                            onClick={handleOpenSelectPoster}
                                            className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}
                                        >
                                            <FontAwesomeIcon icon={faImages} size={"sm"} color={"green"} />
                                            <p className={"text-sm"}>Select poster</p>
                                        </li>
                                        <li
                                            onClick={handleClickUploadPoster}
                                            className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}>
                                            <FontAwesomeIcon icon={faUpload} size={"sm"} color={"orange"} />
                                            <p className={"text-sm"}>Upload poster</p>
                                        </li>
                                        <li className={"flex items-center p-2 gap-2 cursor-pointer rounded-md hover:bg-gray-200"}>
                                            <FontAwesomeIcon icon={faTrash} size={"sm"} color={"red"} />
                                            <p className={"text-sm"}>Remove poster</p>
                                        </li>
                                    </ul>
                                </PopoverBody>
                            </Popover>} trigger={"click"} placement={"bottom-start"}>
                                <div
                                    className='px-3 py-1 rounded-md bg-slate-100 mr-2 mb-2 text-white shadow-md cursor-pointer flex items-center justify-center gap-2'>
                                    <FontAwesomeIcon icon={faCamera} color='black' />
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
                        <hr />
                        <br />
                        <TabsUserDetail userInfoMD={userInfo} />
                    </div>
                </div>
            </div>
            <ModalSelectPoster
                showModal={showModalSelectPoster}
                setShowModal={setShowModalSelectPoster}
                onSelectImage={handleSelectImage}
                images={userImages}
                isLoading={isLoadingImages}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                isShareToNewBoard={isShareToNewBoard}
                setIsShareToNewBoard={setIsShareToNewBoard}
            />
        </>
    )
}
