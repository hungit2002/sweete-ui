import React, { useEffect, useState } from 'react'
import ModalDefault from '../../modal/ModalDefault'
import { useDebounce } from 'use-debounce';
import { UserInfoLS, UserInfoMD } from '@/models';
import { fetchFriendsByParam } from '@/Services/userService';
import { toast } from 'react-toastify';
import AvatarUser from '../../avatar';
import Loading from '../../Loading/Loading';

export default function ModalTagFriendsOnPost(props: {
    userInfo: UserInfoLS,
    showModalTagFriendOnPost: boolean,
    setShowModalCreateFeed: any,
    setShowModalTagFriendOnPost: any,
    friendTagsPost: UserInfoMD[],
    setFriendTagsPost: any,
}) {
    const { userInfo, showModalTagFriendOnPost, setShowModalCreateFeed, setShowModalTagFriendOnPost, setFriendTagsPost } = props;

    const [friends, setFriends] = useState<UserInfoMD[]>([])
    const [textSearch, setTextSearch] = useState<string>("")
    const [inputSearchValue] = useDebounce(textSearch, 500);
    const [loading, setLoading] = useState<boolean>(false)
    const [friendTags, setFriendTags] = useState<UserInfoMD[]>([])

    const handleCloseModalTagFriendOnPost = () => {
        setShowModalTagFriendOnPost(false);
        setShowModalCreateFeed(true);
    }

    const handleClickTagFriend = (friend: UserInfoMD) => {
        if (friendTags?.some((f: UserInfoMD) => f.id === friend.id)) {
            setFriendTags((prev: any) => {
                return prev.filter((f: UserInfoMD) => f.id !== friend.id)
            }
            )
        } else {
            setFriendTags((prev: any) => {
                return [...prev, friend]
            }
            )
        }
    }

    const getFriendByName = () => {
        if (textSearch === "") {
            setFriends([])
            return
        }
        setLoading(true)
        fetchFriendsByParam(userInfo?.id, textSearch)
            .then((res: any) => {
                setLoading(false)
                if (res?.data?.meta?.code === 200) {
                    setFriends(res?.data?.result)
                }
            }
            ).catch((err: any) => {
                setLoading(false)
                console.log(err);
                toast.error("Error when get friends")
            })

    }

    useEffect(() => {
        getFriendByName()
    }, [inputSearchValue])

    useEffect(() => {
        setFriendTags
    }, [])
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Tags friends</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <input
                            type="text"
                            placeholder="Search friends"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                        />
                        <div className='mt-2'>
                            {
                                friendTags?.length > 0 && <div>
                                    <p>Tagged :</p>
                                    <div className='p-2 border rounded-md my-2 grid grid-cols-3 gap-2'>
                                        {
                                            friendTags?.length > 0 && <>
                                                {
                                                    friendTags?.map((friend: UserInfoMD, index: number) => (
                                                        <div key={index} className="flex items-center gap-2 border rounded-md p-2 cursor-pointer hover:bg-gray-200"
                                                            onClick={() => {
                                                                setFriendTags((prev: any) => prev.filter((f: UserInfoMD) => f.id !== friend.id))
                                                            }}
                                                        >
                                                            <p className='text-sm text-blue-500'>{friend?.full_name}</p>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            }
                            <div className='overflow-y-auto max-h-[300px] flex flex-col gap-2'>
                                {
                                    loading ? <Loading /> : <>
                                        {
                                            friends?.length > 0 ? <>
                                                {
                                                    friends?.map((friend: UserInfoMD, index: number) => (
                                                        <div key={index} className={`flex items-center gap-2 cursor-pointer border-1 rounded-md p-2 hover:bg-gray-200 ${friendTags?.some((f: UserInfoMD) => f.id === friend.id)
                                                            ? 'border-red-500'
                                                            : 'border-gray-200'}`}
                                                            onClick={() => handleClickTagFriend(friend)}
                                                        >
                                                            <div className='w-[20px] h-[20px]'>
                                                                <AvatarUser path={friend?.avatar} />
                                                            </div>
                                                            <p className='text-sm'>{friend?.full_name}</p>
                                                        </div>
                                                    ))
                                                }
                                            </> : <div className="flex items-center justify-center w-full h-[200px] bg-gray-100 rounded-md">
                                                <p>No friend found</p>
                                            </div>
                                        }</>
                                }
                            </div>
                        </div>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalTagFriendOnPost}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                                onClick={() => {
                                    setFriendTagsPost(friendTags)
                                    handleCloseModalTagFriendOnPost()
                                }}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                }
                show={showModalTagFriendOnPost}
                handleClose={handleCloseModalTagFriendOnPost}
            />
        </>
    )
}
