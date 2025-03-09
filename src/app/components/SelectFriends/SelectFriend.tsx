import React, {useEffect} from 'react';
import {fetchFriendsByParam} from "@/Services/userService";
import {getUserInfoLS} from "@/Utils/Storage";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/app/components/Loading/Loading";
import {useDebounce} from "use-debounce";

const SelectFriend = (props: {
    friendSelected: any,
    setFriendSelected: any,
    placeholder?: string,
    detail?: string,
    friendRemains?: any
}) => {
    const {friendSelected, setFriendSelected, placeholder, detail, friendRemains} = props;

    const [inputFriendExtract, setInputFriendExtract] = React.useState<string>("");
    const [inputSearchValue] = useDebounce(inputFriendExtract, 500);
    const [friends, setFriends] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const getFriendsByName = () => {
        if (inputFriendExtract === "") {
            setFriends([])
            return
        }
        setLoading(true)
        fetchFriendsByParam(getUserInfoLS()?.id, inputFriendExtract)
            .then((res: any) => {
                setLoading(false)
                if (res?.data?.meta?.code === 200) {
                    let friendSource = res?.data?.result
                    if (friendRemains){
                        friendSource = friendSource.filter((f: any) => !friendRemains.find((fr: any) => fr.id === f.id))
                    }
                    setFriends(friendSource)
                }
            }).catch((err: any) => {
            setLoading(false)
            console.log(err);
            toast.error("Error when get friends")
        })
    }
    useEffect(() => {
        setFriends([])
        getFriendsByName()
    }, [inputSearchValue])
    return (
        <div>
            <input
                className={"w-full border border-gray-300 rounded-lg p-2"}
                type="text"
                placeholder={placeholder || "Search friends"}
                value={inputFriendExtract}
                onChange={(e) => setInputFriendExtract(e.target.value)}
            />
            {
                friendSelected?.length > 0 && <div className={"my-2"}>
                    {detail && <p className={"text-sm font-bold"}>
                        {detail}
                    </p> }
                    <div className={"grid grid-cols-4 gap-2 my-2 border rounded-md p-3"}>
                        {
                            friendSelected?.map((friend: any) => (
                                <div key={friend.id}
                                     className="flex justify-between items-center gap-2 p-2 border-1 border-blue-500 text-blue-800 rounded-md hover:bg-gray-200 cursor-pointer"
                                     onClick={() => {
                                         setFriendSelected(friendSelected?.filter((f: any) => f.id !== friend.id))
                                     }}
                                >
                                    <p className={"text-sm"}>{friend?.full_name}</p>
                                    <FontAwesomeIcon icon={faXmark} size={"sm"}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            {
                loading ? <div><Loading/></div> : <>
                    {
                        friends?.length > 0 &&
                        <div className={"flex flex-col gap-2 my-2 border rounded-md p-3 max-h-[400px] overflow-y-auto"}>
                            {
                                friends?.map((friend: any) => (
                                    <div key={friend.id}
                                         className={`flex items-center gap-2 cursor-pointer p-2 border-1 rounded-md hover:bg-gray-200 ${friendSelected?.find((f: any) => f.id === friend.id) ? 'border-red-500 text-red-800' : 'border-gray-200'}`}
                                         onClick={() => {
                                             if (friendSelected?.find((f: any) => f.id === friend.id)) {
                                                 setFriendSelected(friendSelected?.filter((f: any) => f.id !== friend.id))
                                                 return
                                             }
                                             setFriendSelected((prev: any) => [...prev, friend])
                                         }}
                                    >
                                        <p>{friend?.full_name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default SelectFriend;