import {useEffect, useState} from 'react';
import ModalDefault from '../../modal/ModalDefault';
import {FEED_STATUS_FRIEND_EXTRACT, FEED_STATUS_FRIEND_SPECIFIC} from "@/constant";
import SelectFriend from "@/app/components/SelectFriends/SelectFriend";

export default function ModalChooseFriendExtract(props: {
    showModalFriendExtract: boolean,
    setShowModalFriendExtract: any,
    setShowModalChooseStatusFeed: any,
    statusFeed: any,
    setStatusFeed: any
}) {
    const {
        showModalFriendExtract,
        setShowModalFriendExtract,
        setShowModalChooseStatusFeed,
        statusFeed,
        setStatusFeed
    } = props;

    const [friendsSelect, setFriendsSelect] = useState<any>([])
    const handleCloseModalFriendExtract = () => {
        setShowModalFriendExtract(false);
        setShowModalChooseStatusFeed(true);
    };
    const handleClickSaveFriendExtract = () => {
        if (statusFeed?.type === FEED_STATUS_FRIEND_EXTRACT) {
            setStatusFeed({
                ...statusFeed,
                friends_expect: friendsSelect
            })
        }else if (statusFeed?.type === FEED_STATUS_FRIEND_SPECIFIC) {
            setStatusFeed({
                ...statusFeed,
                friends_specific: friendsSelect
            })
        }
        setShowModalFriendExtract(false);
        setShowModalChooseStatusFeed(true);
    }
    useEffect(() => {
        if (statusFeed?.type === FEED_STATUS_FRIEND_EXTRACT) {
            setStatusFeed(
                {
                    ...statusFeed,friends_specific: []
                }
            )
            setFriendsSelect(statusFeed?.friends_expect)
        } else if (statusFeed?.type === FEED_STATUS_FRIEND_SPECIFIC) {
            setStatusFeed(
                {
                    ...statusFeed,friends_expect: []
                }
            )
            setFriendsSelect(statusFeed?.friends_specific)
        }
    }, [])
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        {
                            statusFeed?.type === FEED_STATUS_FRIEND_EXTRACT &&
                            <h1 className={"font-bold"}>Friend extract</h1>
                        }
                        {
                            statusFeed?.type === FEED_STATUS_FRIEND_SPECIFIC &&
                            <h1 className={"font-bold"}>Friend specific</h1>
                        }
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <SelectFriend friendSelected={friendsSelect} setFriendSelected={setFriendsSelect}
                                      placeholder={statusFeed?.type === FEED_STATUS_FRIEND_EXTRACT ? "Search friends extract" : statusFeed?.type === FEED_STATUS_FRIEND_SPECIFIC ? "Search friends specific" : "Search friends"}
                                      detail={statusFeed?.type === FEED_STATUS_FRIEND_EXTRACT ? "Friends will not see your posts." : statusFeed?.type === FEED_STATUS_FRIEND_SPECIFIC ? "Friends will see your post." : ""}
                        />
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
                                onClick={handleClickSaveFriendExtract}
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
