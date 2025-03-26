import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEarth, faEllipsis, faHeart, faShare, faThumbsUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {AvatarDefault, LIST_STATUS_FEEDS, TYPE_IMAGE_GIF} from "@/constant";
import timeUtil from "@/Utils/Time";
import {FEED_STATUS} from "@/models";
import PostImagesFeed from "@/app/components/PostImagesFeed/PostImagesFeed";
import {OverlayTrigger, Popover, PopoverBody} from "react-bootstrap";
import {useAppSelector} from "@/lib/hooks";

function Feed(props: {
    maxLength: number,
    post: Post
}) {
    const {maxLength, post} = props;
    const friends = useAppSelector(state => state.post.posts.friends);

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div>
            <div className={"border rounded-xl"}>
                <div className={"p-2"}>
                    <div className={"flex justify-between items-center"}>
                        <div className={"flex gap-2 items-center"}>
                            <div>
                                <div className={"rounded-full"}>
                                    <img
                                        src={post.user.avatar || AvatarDefault}
                                        className={"w-[37px] h-[37px] rounded-full object-cover border"}/>
                                </div>
                            </div>
                            <div className={"flex flex-col"}>
                                <p className={"font-bold text-sm"}>{post.user.full_name}</p>
                                <div className={"text-xs text-gray-500 flex items-center gap-1"}>
                                    <p>{
                                        timeUtil(post.created_at)
                                    }</p> <span>&#x2022;</span>
                                    <OverlayTrigger overlay={
                                        <Popover id={"popover-status"}>
                                            <PopoverBody>
                                                {
                                                    post.friends_expect
                                                }
                                                {
                                                    post.friends_view
                                                }
                                            </PopoverBody>
                                        </Popover>
                                    }>
                                        <FontAwesomeIcon
                                            icon={LIST_STATUS_FEEDS.find((status: FEED_STATUS) => status.value === post.status)?.icon || faEarth}
                                            size={"sm"}
                                            className={"cursor-pointer"}
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <div
                                className={"w-[40px] h-[40px] hover:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer"}>
                                <FontAwesomeIcon icon={faEllipsis} size={"lg"} color={"#777777"}/>
                            </div>
                            <div
                                className={"w-[40px] h-[40px] hover:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer"}>
                                <FontAwesomeIcon icon={faXmark} size={"lg"} color={"#777777"}/>
                            </div>
                        </div>
                    </div>
                    <div className={"mt-2"}>
                        <div>
                            <p className={"text-sm inline"}>
                                {isExpanded ? post.content : post.content.slice(0, maxLength) + (post.content.length > maxLength ? "..." : "")}
                            </p>
                            {post.content.length > maxLength && (
                                <button
                                    onClick={toggleExpand}
                                    className="underline mt-1 mx-2 text-sm font-bold"
                                >
                                    {isExpanded ? "Thu gọn" : "Xem thêm"}
                                </button>
                            )}
                        </div>
                        <div className="mt-2">
                            {post.hashtags?.map((tag, index) => (
                                <span key={index}
                                      className="text-blue-500 mr-2 text-sm font-bold hover:underline cursor-pointer">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={"border-y p-4"}>
                    {
                        post?.images?.length > 0 &&
                        <PostImagesFeed
                            images={post.images?.filter((image: Image) => image.type !== TYPE_IMAGE_GIF)?.map((image: Image) => (
                                {
                                    url: image.path,
                                }
                            ))}/>
                    }
                </div>
                <div className={"px-2 flex items-center justify-between border-b"}>
                    <div className={"flex items-center gap-1"}>
                        <div className="relative flex items-center justify-center py-2">
                            <div
                                className="w-5 h-5 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer">
                                <FontAwesomeIcon icon={faThumbsUp} size={"xs"} color={"white"}/>
                            </div>
                            <div
                                className="w-5 h-5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer">
                                <FontAwesomeIcon icon={faHeart} size={"xs"} color={"white"}/>
                            </div>
                            <div
                                className="w-5 h-5 bg-yellow-50 rounded-full flex justify-center items-center text-lg cursor-pointer">
                                &#128518;
                            </div>
                        </div>
                        <span className="text-sm text-gray-500 hover:underline cursor-pointer">
                            5,7K
                        </span>
                    </div>
                    <div className={"flex gap-2"}>
                        <p className="text-sm text-gray-500 hover:underline cursor-pointer">
                            5 comments
                        </p>
                        <p className="text-sm text-gray-500 hover:underline cursor-pointer">
                            5 shares
                        </p>
                    </div>
                </div>
                <div className={"grid grid-cols-3 px-2 py-1"}>
                    <div
                        className={"flex justify-center items-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-1"}>
                        <FontAwesomeIcon icon={faThumbsUp} size={"lg"} className={"text-blue-500"}/>
                        Like
                    </div>
                    <div
                        className={"flex justify-center items-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-1"}>
                        <FontAwesomeIcon icon={faComment} size={"lg"} className={"text-red-500"}/>
                        Comment
                    </div>
                    <div
                        className={"flex justify-center items-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-1"}>
                        <FontAwesomeIcon icon={faShare} size={"lg"} className={"text-yellow-500"}/>
                        Share
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed;