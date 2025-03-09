import React, {useEffect} from 'react'
import ModalDefault from '../../modal/ModalDefault';
import {
    FEED_STATUS_CUSTOM,
    FEED_STATUS_FRIEND_EXTRACT,
    FEED_STATUS_FRIEND_SPECIFIC, FEED_STATUS_PUBLIC,
    LIST_STATUS_FEEDS
} from '@/constant';
import {FEED_STATUS, UserInfoMD} from '@/models';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useForm} from 'react-hook-form';

interface IFromRadio {
    status: string;
}

export default function ModalChooseStatusFeed(props: {
    showModalChooseStatusFeed: boolean,
    setShowModalCreateFeed: any,
    setShowModalChooseStatusFeed: any,
    setShowModalFriendExtract: any,
    statusFeed: any,
    setStatusFeed: any
    setShowModalCustomFriendSelect: any

}) {

    const {
        showModalChooseStatusFeed,
        setShowModalCreateFeed,
        setShowModalChooseStatusFeed,
        setShowModalFriendExtract,
        statusFeed,
        setStatusFeed,
        setShowModalCustomFriendSelect
    } = props;

    const {register, handleSubmit, getValues, setValue} = useForm<IFromRadio>({
        defaultValues: {
            status: FEED_STATUS_PUBLIC,
        }
    });

    const handleCloseModalChooseStatusFeed = () => {
        setShowModalChooseStatusFeed(false);
        setShowModalCreateFeed(true);
    };
    const handleSubmitStatusFeed = () => {
        setShowModalChooseStatusFeed(false);
        setShowModalCreateFeed(true);
    }

    useEffect(() => {
        if (statusFeed?.type) {
            setValue("status", statusFeed.type);
        }
    }, [statusFeed, setValue]);
    return (
        <>
            {/* Modal choose status feed */}
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Subject of the article</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <p className={"font-bold text-sm"}>Who can see your posts?</p>
                        <p className={"text-sm text-gray-500"}>
                            Your posts will appear on your feed, your profile, and in search
                            results.
                        </p>
                        <p className={"text-sm text-gray-500 mt-2"}>
                            Although the default audience is Public, you can change the
                            audience for this particular post.
                        </p>
                        <div className={"mt-2 max-h-[400px] overflow-y-auto"}>
                            <form>
                                {LIST_STATUS_FEEDS.map((feed: FEED_STATUS, index: number) => (
                                    <label
                                        key={index}
                                        className={
                                            "flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 cursor-pointer"
                                        }
                                        htmlFor={feed.id}
                                        onClick={() => {
                                            setStatusFeed({
                                                type: feed.id,
                                                name: feed.label,
                                                friends_expect: statusFeed?.friends_expect || [],
                                                friends_specific: statusFeed?.friends_specific || [],
                                            });
                                            if (feed.id === FEED_STATUS_FRIEND_EXTRACT || feed.id === FEED_STATUS_FRIEND_SPECIFIC) {
                                                setShowModalChooseStatusFeed(false);
                                                setShowModalFriendExtract(true);
                                            } else if (feed.id === FEED_STATUS_CUSTOM) {
                                                setShowModalChooseStatusFeed(false);
                                                setShowModalCustomFriendSelect(true);
                                            }
                                        }}
                                    >
                                        <div className={"flex items-center gap-3 "}>
                                            <div
                                                className={
                                                    "w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center"
                                                }
                                            >
                                                <FontAwesomeIcon icon={feed.icon} size={"xl"}/>
                                            </div>
                                            <div>
                                                <p className={"font-bold"}>{feed.label}</p>
                                                {feed?.detail && (
                                                    <p className={"text-sm text-gray-500"}>
                                                        {feed?.detail}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                id={feed.id}
                                                type={"radio"}
                                                {...register("status")}
                                                value={feed.id}
                                                checked={feed.id === getValues("status")}
                                            />
                                        </div>
                                    </label>
                                ))}
                            </form>
                        </div>
                        <div className={"my-2"}>
                            {
                                statusFeed?.friends_expect?.length > 0 && <div className={"flex flex-col gap-1"}>

                                    <p className={"font-bold text-sm"}>Friends will not see your posts: </p>
                                    <p className={"text-sm text-gray-500"}>
                                        {
                                            statusFeed?.friends_expect?.map((it: any) => it?.full_name)?.join(", ")
                                        }
                                    </p>
                                </div>
                            }
                            {
                                statusFeed?.friends_specific?.length > 0 && <div className={"flex flex-col gap-1"}>
                                    <p className={"font-bold text-sm"}>Friends will see your posts: </p>
                                    <p className={"text-sm text-gray-500"}>
                                        {
                                            statusFeed?.friends_specific?.map((it: any) => it?.full_name)?.join(", ")
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                        <hr className={"my-2"}/>
                        <div className={"flex items-center gap-2 p-2"}>
                            <input type={"checkbox"} id="default" onChange={(e) => {
                                if (e.target.checked) {
                                    setStatusFeed({
                                        type: FEED_STATUS_PUBLIC,
                                        name: "Public",
                                        friends_expect: [],
                                        friends_specific: [],
                                    });
                                }
                            }}/>
                            <label className={"text-sm font-bold"} htmlFor="default">
                                Set as default object
                            </label>
                        </div>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalChooseStatusFeed}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                                onClick={handleSubmitStatusFeed}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                }
                show={showModalChooseStatusFeed}
                handleClose={handleCloseModalChooseStatusFeed}
            />
        </>
    )
}
