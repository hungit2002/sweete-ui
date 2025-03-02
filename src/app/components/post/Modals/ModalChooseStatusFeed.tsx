import React from 'react'
import ModalDefault from '../../modal/ModalDefault';
import { FEED_STATUS_FRIEND_EXTRACT, LIST_STATUS_FEEDS } from '@/constant';
import { FEED_STATUS } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';

interface IFromRadio {
    status: string;
}

export default function ModalChooseStatusFeed(props:{
    showModalChooseStatusFeed: boolean,
    setShowModalCreateFeed: any,
    setShowModalChooseStatusFeed: any,
    setShowModalFriendExtract: any,
}) {

    const { 
        showModalChooseStatusFeed,
        setShowModalCreateFeed,
        setShowModalChooseStatusFeed, 
        setShowModalFriendExtract 
    } = props;

    const { register, handleSubmit } = useForm<IFromRadio>();

    const handleCloseModalChooseStatusFeed = () => {
        setShowModalChooseStatusFeed(false);
        setShowModalCreateFeed(true);
    };
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
                        <div className={"mt-2 max-h-[200px] overflow-y-auto"}>
                            <form>
                                {LIST_STATUS_FEEDS.map((feed: FEED_STATUS, index: number) => (
                                    <label
                                        key={index}
                                        className={
                                            "flex items-center justify-between hover:bg-gray-100 rounded-xl p-2 cursor-pointer"
                                        }
                                        htmlFor={feed.id}
                                        onClick={() => {
                                            if (feed.id === FEED_STATUS_FRIEND_EXTRACT) {
                                                setShowModalChooseStatusFeed(false);
                                                setShowModalFriendExtract(true);
                                            }
                                        }}
                                    >
                                        <div className={"flex items-center gap-3 "}>
                                            <div
                                                className={
                                                    "w-[60px] h-[60px] bg-gray-200 rounded-full flex items-center justify-center"
                                                }
                                            >
                                                <FontAwesomeIcon icon={feed.icon} size={"xl"} />
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
                                            />
                                        </div>
                                    </label>
                                ))}
                            </form>
                        </div>
                        <hr className={"my-2"} />
                        <div className={"flex items-center gap-2 p-2"}>
                            <input type={"checkbox"} id="default" />
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
