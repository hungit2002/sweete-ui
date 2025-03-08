import {faMinusCircle, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import AvatarUser from '../../avatar';
import ModalDefault from '../../modal/ModalDefault';
import {fetchFriends, fetchFriendsByParam} from "@/Services/userService";
import {toast} from "react-toastify";
import {useDebounce} from "use-debounce";
import {getUserInfoLS} from "@/Utils/Storage";
import Loading from "@/app/components/Loading/Loading";

export default function ModalChooseFriendExtract(props: {
    showModalFriendExtract: boolean,
    setShowModalFriendExtract: any,
    setShowModalChooseStatusFeed: any
}) {
    const {
        showModalFriendExtract,
        setShowModalFriendExtract,
        setShowModalChooseStatusFeed
    } = props;

    const [friends, setFriends] = useState<any>([])
    const [textSearch, setTextSearch] = useState<string>("")
    const [inputSearchValue] = useDebounce(textSearch, 500);
    const [loading, setLoading] = useState<boolean>(false)
    const handleCloseModalFriendExtract = () => {
        setShowModalFriendExtract(false);
        setShowModalChooseStatusFeed(true);
    };
    const getFriendByName = () => {
        if (textSearch === "") {
            setLoading(true)
            fetchFriends(getUserInfoLS()?.id, 10)
                .then((res: any) => {
                        setLoading(false)
                        if (res?.data?.meta?.code === 200) {
                            setFriends(res?.data?.result?.map((item:any) => ({
                                ...item,
                                status: 0
                            })))
                        }
                    }
                ).catch((err: any) => {
                setLoading(false)
                console.log(err);
                toast.error("Error when get friends")
            })
            return
        }
        setLoading(true)
        fetchFriendsByParam(getUserInfoLS()?.id, textSearch)
            .then((res: any) => {
                    setLoading(false)
                    if (res?.data?.meta?.code === 200) {
                        setFriends(res?.data?.result?.map((item:any) => ({
                            ...item,
                            status: 0
                        })))
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
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Friend extract</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <div className="mb-3">
                            <input
                                type={"text"}
                                placeholder={"Search for friends"}
                                className={"w-full p-2 rounded border"}
                                value={textSearch}
                                onChange={(e) => setTextSearch(e.target.value)}
                            />
                        </div>
                        <h1 className="font-bold">Friends</h1>
                        <div>
                            {
                                loading ? <div>
                                    <Loading/>
                                </div> : <ul className="my-3 flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                                    {friends.map((item: any, index: number) => (
                                        <li
                                            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                            key={index}
                                            onClick={() => {
                                                setFriends((prev: any) => [
                                                    ...prev.map((i: any) =>
                                                        i.id === item.id
                                                            ? {...i, status: i.status === 0 ? 1 : 0}
                                                            : i
                                                    ),
                                                ]);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-[40px] h-[40px] border rounded-full">
                                                    <AvatarUser
                                                        path={item.avatar}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{item.full_name}</p>
                                                    <p className="text-xs">{item.address}</p>
                                                </div>
                                            </div>
                                            <FontAwesomeIcon
                                                icon={faMinusCircle}
                                                size={"lg"}
                                                color={item.status === 0 ? "" : "red"}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                        {friends.filter((item: any) => item.status === 1).length > 0 && (
                            <>
                                <hr/>
                                <div className="my-2 p-2">
                                    <div
                                        className="border rounded-lg p-2 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                                        <p className="text-sm font-thin">
                                            Friend don't see the feed
                                        </p>
                                        <div className="flex flex-wrap gap-2 items-center">
                                            {friends
                                                ?.filter((friend: any) => friend.status === 1)
                                                ?.map((fb: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 py-1 px-2 rounded bg-blue-100 cursor-pointer"
                                                        onClick={() => {
                                                            setFriends((prev: any) => [
                                                                ...prev.map((i: any) =>
                                                                    i.id === fb.id
                                                                        ? {...i, status: i.status === 0 ? 1 : 0}
                                                                        : i
                                                                ),
                                                            ]);
                                                        }}
                                                    >
                                                        <div className="w-[20px] h-[20px] border rounded-full">
                                                            <AvatarUser path={fb?.avatar}/>
                                                        </div>
                                                        <p className="text-blue-800">{fb.full_name}</p>
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            size={"sm"}
                                                            color="blue"
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalFriendExtract}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                }
                show={showModalFriendExtract}
                handleClose={handleCloseModalFriendExtract}
            />
        </>
    )
}
