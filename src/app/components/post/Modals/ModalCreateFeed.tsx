import {BACKGROUND_FEEDS, EMOJIS, Feeling, LIST_STATUS_FEEDS} from '@/constant';
import {UserInfoLS, UserInfoMD} from '@/models';
import {
    faCaretDown,
    faEarth,
    faEllipsis,
    faGift,
    faImages,
    faLocationDot,
    faPalette,
    faPencil,
    faPlus,
    faSmile,
    faUserTag,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {useEffect, useRef} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import AvatarUser from '../../avatar';
import ModalDefault from '../../modal/ModalDefault';
import PostImages from '../../PostImages/PostImages';
import {ConvertBlobToFile} from "@/Utils/Image";
import {uploadImage} from "@/Services/mediaService";
import {toast} from "react-toastify";
import {createPost} from "@/Services/postService";

export default function ModalCreateFeed(props: {
    userInfo: UserInfoLS,
    selectedBg: {
        bg: string;
        text: string;
    },
    message: string,
    setMessage: any,
    showModalCreateFeed: boolean,
    setShowModalCreateFeed: any,
    setShowModalEditImages: any,
    setShowModalChooseStatusFeed: any,
    showAddImageToFeed: boolean,
    setShowAddImageToFeed: any,
    setShowModalTagFriendsOnPost: any,
    setShowModalFeeling: any,
    setShowModalSelectGifs: any,
    feeling: Feeling,
    friendTagsPost: any,
    images: any,
    setImages: any,
    setLocation: any,
    location: any,
    gifsPost: any,
    setGifsPost: any,
    statusFeed: any,
    setStatusFeed: any,

    showChooseBg: boolean,
    setShowChooseBg: any,

    setSelectedBg: any,
}) {
    const {
        userInfo,
        selectedBg,
        message,
        setMessage,
        showModalCreateFeed,
        setShowModalCreateFeed,
        setShowModalEditImages,
        setShowModalChooseStatusFeed,
        showAddImageToFeed,
        setShowAddImageToFeed,
        setShowModalTagFriendsOnPost,
        setShowModalFeeling,
        friendTagsPost,
        feeling,
        images,
        setImages,
        setLocation,
        location,
        gifsPost,
        setGifsPost,
        setShowModalSelectGifs,
        showChooseBg,
        setShowChooseBg,
        setSelectedBg,
        statusFeed,
        setStatusFeed
    } = props;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<any>(null);

    const handleClickStatusFeed = () => {
        setShowModalCreateFeed(false);
        setShowModalChooseStatusFeed(true);
    };
    const handleCloseModalCreateFeed = () => {
        setShowModalCreateFeed(false);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            const imagesUrls = Array.from(files).map((file: any) =>
                (
                    {
                        url: URL.createObjectURL(file),
                        name: file.name,
                        file: file,
                    }
                ));
            setImages((prev: any) => [...prev, ...imagesUrls.map((url: any, index: number) => ({
                id: Date.now() + (index + 1),
                url: url?.url,
                name: url?.name,
                note: "",
                friendTags: [],
                file: url?.file,
            }))]);
        }
    };

    const insertEmoji = (emoji: string) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            setMessage((prev: any) => prev.slice(0, start) + emoji + prev.slice(end));
            setTimeout(
                () =>
                    textarea.setSelectionRange(
                        start + emoji.length,
                        start + emoji.length
                    ),
                0
            );
        }
    };

    const getLocal = (ip: string) => {
        axios.get(`http://ip-api.com/json/${ip}?fields=status,message,continent,country,countryCode,region,regionName,city,district,zip,timezone,currency,isp,org`).then(res => {
            setLocation(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    const getIp = () => {
        axios.get(`https://api.ipify.org?format=json`).then(res => {
            if (res.status === 200) {
                getLocal(res.data.ip);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleClickCheckIn = () => {
        getIp();
    };

    const handleClickPost = async () => {
        const data = {
            user_id: userInfo?.id,
            content: message,
            images: images,
            friends: friendTagsPost.map((friend: UserInfoMD) => friend.id),
            feeling: feeling,
            status: statusFeed,
            checkin: location,
            background: selectedBg,
            gifs: gifsPost.map((gif: any) => ({
                url: gif?.secure_url,
                name: gif?.display_name,
                size: gif?.bytes,
                type: gif?.format,
            })),
        }
        const mapImage: Record<number, any> = Object.fromEntries(
            data.images.map((image: any, index: number) => [index, image])
        )

        await Promise.all(data?.images?.map((image: any) => uploadImage(image?.file))).then((res) => {
            const images = res.map((image: any, index: number) => ({
                index: index,
                url: image?.data?.result?.secure_url,
                name: image?.data?.result?.display_name,
                size: image?.data?.result?.bytes,
                type: image?.data?.result?.format,
            }));
            for (const image of images) {
                mapImage[image.index] = {
                    ...mapImage[image.index],
                    imageResult: image,
                }
            }
            return mapImage;
        }).then((res: any) => {
            let body = {
                user_id: userInfo?.id,
                content: message,
                images: Object.values(res).map((image: any) => ({
                    url: image?.imageResult?.url,
                    name: image?.imageResult?.name,
                    size: image?.imageResult?.size,
                    type: image?.imageResult?.type,
                    note: image?.note,
                    friends: image?.friendTags,
                })),
                friends: friendTagsPost,
                feeling: feeling.id,
                status: statusFeed,
                checkin: JSON.stringify(location),
                background: JSON.stringify(selectedBg),
                gifs: data.gifs,
            }
            return createPost(body)
        })
            .then((res: any) => {
                console.log(res);
            })
            .catch(err => {
                toast.error("Upload images error");
                console.log(err);
            })
    }
    useEffect(() => {
        const textarea = document.getElementById("message") as HTMLTextAreaElement;
        if (textarea) {
            textareaRef.current = textarea;
        }
    }, []);
    console.log(images)
    return (
        <>
            {/* Modal create feed */}
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Create Feed</h1>
                    </div>
                }
                body={
                    <div>
                        <div className={"flex items-center gap-2 px-3"}>
                            <div className={"w-[46px] h-[46px]"}>
                                <AvatarUser path={userInfo?.avatar}/>
                            </div>
                            <div className='flex w-full flex-col items-start'>
                                <p className={"font-bold"}>{userInfo?.full_name} {feeling &&
                                    <span>{feeling.emoji} <span className='font-light'>is feeling</span> {feeling.text}</span>}
                                    {
                                        friendTagsPost?.length > 0 && (
                                            <span>
                                                <span className='font-light'> with </span>
                                                {friendTagsPost?.slice(0, 3)?.map((friend: UserInfoMD) => friend.full_name).join(', ')}
                                                {friendTagsPost?.length > 3 && ` và ${friendTagsPost?.length - 3} người khác`}
                                            </span>
                                        )
                                    }
                                    {
                                        location && <span>
                                            <span className='font-light'> at </span>
                                            {location?.city}, {location?.country}
                                        </span>
                                    }
                                </p>
                                {
                                    statusFeed?.friends_expect?.length > 0 || statusFeed?.friends_specific?.length > 0 ?
                                        <OverlayTrigger
                                            overlay={
                                                <Popover id={"popover-friend-selects"}>
                                                    <Popover.Body>
                                                        <div>
                                                            {
                                                                statusFeed?.friends_expect?.length > 0 && <div>
                                                                    <div className={"text-sm font-bold"}>Friends will not
                                                                        see
                                                                        your posts:
                                                                    </div>
                                                                    {
                                                                        statusFeed?.friends_expect?.map((friend: UserInfoMD) => (
                                                                            <div key={friend.id}
                                                                                 className={"flex items-center gap-2"}>
                                                                                <p className={"text-sm font-light"}>{friend.full_name}</p>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            }
                                                            {
                                                                statusFeed?.friends_specific?.length > 0 && <div>
                                                                    <div className={"text-sm font-bold"}>Friends see your
                                                                        posts:
                                                                    </div>
                                                                    {
                                                                        statusFeed?.friends_specific?.map((friend: UserInfoMD) => (
                                                                            <div key={friend.id}
                                                                                 className={"flex items-center gap-2"}>
                                                                                <p className={"text-sm font-light"}>{friend.full_name}</p>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    </Popover.Body>
                                                </Popover>
                                            } placement={"bottom-start"} trigger={['hover', 'focus']}>
                                            <div
                                                className={
                                                    "flex items-center gap-1 py-1 px-2 bg-gray-300 rounded cursor-pointer"
                                                }
                                                onClick={handleClickStatusFeed}
                                            >
                                                <FontAwesomeIcon
                                                    icon={LIST_STATUS_FEEDS?.find((feed: any) => feed?.id === statusFeed?.type)?.icon || faEarth}
                                                    size={"sm"}
                                                    color={"#777777"}
                                                />
                                                <p className={"text-xs font-bold"}>{
                                                    statusFeed?.name
                                                }</p>
                                                <FontAwesomeIcon icon={faCaretDown} size={"sm"}/>
                                            </div>
                                        </OverlayTrigger> : <div
                                            className={
                                                "flex items-center gap-1 py-1 px-2 bg-gray-300 rounded cursor-pointer"
                                            }
                                            onClick={handleClickStatusFeed}
                                        >
                                            <FontAwesomeIcon
                                                icon={LIST_STATUS_FEEDS?.find((feed: any) => feed?.id === statusFeed?.type)?.icon || faEarth}
                                                size={"sm"}
                                                color={"#777777"}
                                            />
                                            <p className={"text-xs font-bold"}>{
                                                statusFeed?.name
                                            }</p>
                                            <FontAwesomeIcon icon={faCaretDown} size={"sm"}/>
                                        </div>
                                }
                            </div>
                        </div>
                        <div
                            className={"my-3"}
                            style={{
                                background: selectedBg.bg,
                            }}
                        >
                            <textarea
                                id="message"
                                rows={4}
                                className={`custom-textarea block py-2.5 px-2 w-full  outline-0 bg-transparent`}
                                style={{
                                    color: selectedBg.text,
                                }}
                                placeholder={`${userInfo?.full_name}, what are you thinking?`}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                ref={textareaRef}
                            >

                            </textarea>
                            {
                                showAddImageToFeed && <div className={"p-2 "}>
                                    <div className={"border rounded-md p-2 relative"}>
                                        <div
                                            onClick={() => {
                                                setImages([])
                                                setShowAddImageToFeed(false)
                                            }}
                                            className={"absolute top-5 right-5 p-2 bg-gray-100 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer border z-[9999]"}>
                                            <FontAwesomeIcon icon={faXmark} size={"sm"}/>
                                        </div>
                                        {
                                            images?.length === 0 ? <>

                                                <div
                                                    className={"bg-gray-100 flex items-center justify-center min-h-[250px] hover:bg-gray-200 cursor-pointer"}
                                                    onClick={handleClick}>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                    <div className={"flex flex-col gap-0 items-center justify-center"}>
                                                        <div
                                                            className={"p-2 w-[40px] h-[40px] flex items-center justify-center bg-gray-300 rounded-md mb-2"}>
                                                            <FontAwesomeIcon icon={faPlus} size={"sm"} color={"#777777"}/>
                                                        </div>
                                                        <p className={"text-sm font-bold"}>Add images</p>
                                                        <p className={"text-xs font-light"}>Or drag and drop</p>
                                                    </div>
                                                </div>
                                            </> : <div className={"relative"}>
                                                <div className="absolute top-2 left-2 z-[9999] flex items-center gap-2">
                                                    <div
                                                        className={"py-1 px-2 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer border"}
                                                        onClick={handleClick}>
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            accept="image/*"
                                                            multiple
                                                            className="hidden"
                                                            onChange={handleFileChange}
                                                        />
                                                        <FontAwesomeIcon className={"me-2"} icon={faPlus} size={"sm"}/>
                                                        <p>More Image</p>
                                                    </div>
                                                    <div
                                                        className={"py-1 px-2 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer border"}
                                                        onClick={() => {
                                                            setShowModalCreateFeed(false);
                                                            setShowModalEditImages(true);
                                                        }}>
                                                        <FontAwesomeIcon className={"me-2"} icon={faPencil} size={"sm"}/>
                                                        <p>Edit Images</p>
                                                    </div>
                                                </div>
                                                <PostImages images={images}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                            {
                                gifsPost?.length > 0 && <div className={"m-2 relative"}>
                                    <div
                                        onClick={() => {
                                            setGifsPost([])
                                        }}
                                        className={"absolute top-2 right-2 p-2 bg-gray-100 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer border z-[9999]"}>
                                        <FontAwesomeIcon icon={faXmark} size={"sm"}/>
                                    </div>
                                    <PostImages images={gifsPost?.map((gif: any) => ({
                                        url: gif?.secure_url,
                                    }))}/>
                                </div>
                            }
                            <div className="flex items-center justify-between mt-2 px-2 py-2">
                                <div className="flex gap-2">
                                    <button
                                        className="px-2 py-1 rounded cursor-pointer bg-white border"
                                        onClick={() => {
                                            setShowChooseBg(!showChooseBg);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPalette} color={"#197FE9"}/>
                                    </button>
                                    {showChooseBg && (
                                        <div className={"flex items-center gap-1"}>
                                            {BACKGROUND_FEEDS.map((bg: any, index: number) => (
                                                <button
                                                    key={index}
                                                    className="p-1 hover:bg-gray-200 rounded w-[30px] h-[30px] border text-sm flex items-center justify-center"
                                                    style={{
                                                        background: bg.bg,
                                                        color: bg.text,
                                                    }}
                                                    onClick={() => {
                                                        setSelectedBg({
                                                            bg: bg.bg,
                                                            text: bg.text,
                                                        });
                                                    }}
                                                >
                                                    Abc
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    <OverlayTrigger overlay={
                                        <Popover id={"popover-emoji"}>
                                            <Popover.Body>
                                                <div>
                                                    {EMOJIS.map((emoji: string, index: number) => (
                                                        <button
                                                            key={index}
                                                            className={"p-1 rounded cursor-pointer"}
                                                            onClick={() => insertEmoji(emoji)}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                            </Popover.Body>
                                        </Popover>
                                    } placement={"top"} trigger={"click"} rootClose>
                                        <div className={"cursor-pointer"}>
                                            <FontAwesomeIcon icon={faSmile} size={"lg"} color={"orange"}/>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2 mt-2"}>
                            <div
                                className={
                                    "border shadow-sm rounded-xl p-2 flex items-center justify-between"
                                }
                            >
                                <p className={"text-sm pl-2 font-bold"}>Add to your feed</p>
                                <div className={"flex items-center gap-2"}>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                        onClick={() => {
                                            setShowAddImageToFeed(true)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faImages}
                                            size={"lg"}
                                            color={"#58C472"}
                                        />
                                    </button>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                        onClick={() => {
                                            setShowModalCreateFeed(false)
                                            setShowModalTagFriendsOnPost(true)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faUserTag}
                                            size={"lg"}
                                            color={"#1978F2"}
                                        />
                                    </button>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                        onClick={() => {
                                            setShowModalCreateFeed(false)
                                            setShowModalFeeling(true)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSmile}
                                            size={"lg"}
                                            color={"#F7BA2A"}
                                        />
                                    </button>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                        onClick={handleClickCheckIn}
                                    >
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            size={"lg"}
                                            color={"#F5533D"}
                                        />
                                    </button>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                        onClick={() => {
                                            setShowModalCreateFeed(false)
                                            setShowModalSelectGifs(true)
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faGift}
                                            size={"lg"}
                                            color={"#F5533D"}
                                        />
                                    </button>
                                    <button
                                        className={
                                            "hover:bg-gray-100 rounded-full w-[36px] h-[36px]"
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faEllipsis}
                                            size={"lg"}
                                            color={"#777777"}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"p-2"}>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                                onClick={handleClickPost}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                }
                show={showModalCreateFeed}
                handleClose={handleCloseModalCreateFeed}
            />
        </>
    )
}
