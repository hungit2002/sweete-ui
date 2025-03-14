import React, {useEffect, useState} from 'react'
import ModalDefault from '../../modal/ModalDefault'
import {UserInfoLS, UserInfoMD} from '@/models';
import {fetchFriendsByParam} from '@/Services/userService';
import {toast} from 'react-toastify';
import {useDebounce} from 'use-debounce';
import Loading from '../../Loading/Loading';
import AvatarUser from '../../avatar';

export default function ModalTagFriends(props: {
    userInfo: UserInfoLS,
    currentImage: any,
    setCurrentImage: any,
    setImages: any,
    showModalTagFriends: boolean,
    setShowModalTagFriends: any,
    setShowModalEditImages: any,
    statusFeed: any

}) {

    const {
        userInfo,
        currentImage,
        setCurrentImage,
        showModalTagFriends,
        setShowModalTagFriends,
        setShowModalEditImages,
        setImages,
        statusFeed,
    } = props;

    const [friends, setFriends] = useState<UserInfoMD[]>([])
    const [fullname, setFullname] = useState("")
    const [inputSearchValue] = useDebounce(fullname, 500);
    const [loading, setLoading] = useState<boolean>(false)

    const handleCloseModalTagFriends = () => {
        setShowModalTagFriends(false);
        setShowModalEditImages(true);
    };

    const handleClickTagFriend = (friend: UserInfoMD) => {
        if (currentImage?.friendTags?.some((f: UserInfoMD) => f.id === friend.id)) {
            setCurrentImage((prev: any) => {
                return {
                    ...prev,
                    friendTags: prev.friendTags.filter((f: UserInfoMD) => f.id !== friend.id)
                }
            })
        } else {
            setCurrentImage((prev: any) => {
                return {
                    ...prev,
                    friendTags: [...prev.friendTags, friend]
                }
            })
        }
    }

    const getFriendsByName = () => {
        if (fullname === "") {
            setFriends([])
            return
        }
        setLoading(true)
        // Call api get friends
        fetchFriendsByParam(userInfo?.id, fullname).then((res) => {
            setLoading(false)
            if (res.data.meta.code === 200) {
                console.log(res.data.result,statusFeed)
                setFriends(res.data.result)
            }
        }).catch((err) => {
            setLoading(false)
            console.log(err)
            toast.error("Error when get friends")
        })
    }
    useEffect(() => {
        getFriendsByName()
    }, [inputSearchValue])

    return (
        <>
            <ModalDefault
                size="xl"
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Tags Friend</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search friend"
                                    className="w-full border rounded-md p-2"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                <div className='overflow-y-auto h-[300px]'>
                                    {
                                        loading ? <Loading/> : <>
                                            {
                                                friends?.length > 0 ? <div className='flex flex-col gap-2 mt-2'>
                                                        {
                                                            friends?.map((friend: UserInfoMD, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className={`flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-gray-200 border-2 
                                                                    ${currentImage?.friendTags?.some((f: UserInfoMD) => f.id === friend.id)
                                                                        ? 'border-red-500'
                                                                        : 'border-gray-200'}`}
                                                                    onClick={() => handleClickTagFriend(friend)}
                                                                >
                                                                    <div className='w-[20px] h-[20px]'>
                                                                        <AvatarUser path={friend?.avatar}/>
                                                                    </div>
                                                                    <p className='text-sm'>{friend?.full_name}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div> :
                                                    <div className='w-full h-[200px] flex items-center justify-center'>
                                                        <p>No friend found</p>
                                                    </div>
                                            }
                                        </>
                                    }
                                </div>
                                {
                                    currentImage?.friendTags?.length > 0 && <div className='border rounded-md p-2 mt-2'>
                                        <p className='mb-2'>Friends tagged at image:</p>
                                        <div className='grid grid-cols-2 gap-2'>
                                            {
                                                currentImage?.friendTags?.map((friend: UserInfoMD, index: number) => (
                                                    <div key={index}
                                                         className='flex items-center gap-2 cursor-pointer border rounded-md p-2 hover:bg-gray-200'
                                                         onClick={() => {
                                                             setCurrentImage((prev: any) => {
                                                                 return {
                                                                     ...prev,
                                                                     friendTags: prev.friendTags.filter((f: UserInfoMD) => f.id !== friend.id)
                                                                 }
                                                             })
                                                         }}
                                                    >
                                                        <div className='w-[20px] h-[20px]'>
                                                            <AvatarUser path={friend?.avatar}/>
                                                        </div>
                                                        <p className='text-sm'>{friend?.full_name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            <img src={currentImage?.url} alt={`Image`}
                                 className={"w-full h-full object-contain border rounded-md col-span-2"}/>
                        </div>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalTagFriends}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                                onClick={() => {
                                    setImages((prev: any) => prev.map((img: any) => img.id === currentImage.id ? {
                                        ...img,
                                        friendTags: currentImage?.friendTags
                                    } : img))
                                    handleCloseModalTagFriends()
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                }
                show={showModalTagFriends}
                handleClose={handleCloseModalTagFriends}
            />
        </>
    )
}
