import React, {useEffect, useState} from 'react';
import ModalDefault from "@/app/components/modal/ModalDefault";
import SelectFriend from "@/app/components/SelectFriends/SelectFriend";

const ModalCustomFriendSelect = (props:{
    showModalCustomFriendSelect: boolean,
    setShowModalCustomFriendSelect: any,
    setShowModalChooseStatusFeed: any,
    setStatusFeed: any,
    statusFeed: any
}) => {
    const {showModalCustomFriendSelect, setShowModalCustomFriendSelect, setShowModalChooseStatusFeed, setStatusFeed, statusFeed} = props;
    const [friendExtracts, setFriendExtracts] = useState<any>([]);
    const [friendSpecific, setFriendSpecifics] = useState<any>([]);
    const handleCloseModalCustomFriendSelect = () => {
        setShowModalCustomFriendSelect(false);
        setShowModalChooseStatusFeed(true);
    }

    const handleClickSaveFriendSelect = () => {
        setStatusFeed({
            ...statusFeed,
            friends_expect: friendExtracts,
            friends_specific: friendSpecific
        });
        handleCloseModalCustomFriendSelect();
    }
    useEffect(() => {
       setStatusFeed({...statusFeed, friends_expect:statusFeed?.friends_expect, friends_specific:statusFeed?.friends_specific});
       setFriendSpecifics(statusFeed?.friends_specific);
         setFriendExtracts(statusFeed?.friends_expect);
    },[])
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Edit Images</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <SelectFriend friendSelected={friendExtracts} setFriendSelected={setFriendExtracts} friendRemains={friendSpecific} placeholder={"Search Friends Extract"} detail={"Friends will not see your posts."}/>
                        <hr className={"my-3"}/>
                        <SelectFriend friendSelected={friendSpecific} setFriendSelected={setFriendSpecifics} friendRemains={friendExtracts} placeholder={"Search Friends Specific"} detail={"Friends will see your post."}/>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalCustomFriendSelect}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                                onClick={handleClickSaveFriendSelect}
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                }
                show={showModalCustomFriendSelect}
                handleClose={handleCloseModalCustomFriendSelect}
            />
        </>
    );
};

export default ModalCustomFriendSelect;