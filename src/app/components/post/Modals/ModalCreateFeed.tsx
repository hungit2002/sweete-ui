import React, { useEffect, useRef, useState } from 'react'
import ModalDefault from '../../modal/ModalDefault';
import AvatarUser from '../../avatar';
import { faCaretDown, faEarth, faEllipsis, faGift, faImages, faLocationDot, faPalette, faPencil, faPlus, faSmile, faUserTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BACKGROUND_FEEDS, EMOJIS, Feeling } from '@/constant';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { UserInfoLS, UserInfoMD } from '@/models';
import PostImages from '../../PostImages/PostImages';

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
    feeling: Feeling,
    friendTagsPost: any,
    images: any,
    setImages: any,

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
        showChooseBg,
        setShowChooseBg,
        setSelectedBg
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
            const imagesUrls = Array.from(files).map((file: any) => URL.createObjectURL(file));
            setImages((prev: any) => [...prev, ...imagesUrls.map((url: any) => ({
                id: Date.now(),
                url: url,
                note: "",
                friendTags: []
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

    useEffect(() => {
        const textarea = document.getElementById("message") as HTMLTextAreaElement;
        if (textarea) {
            textareaRef.current = textarea;
        }
    }, []);

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
                                <AvatarUser path={userInfo?.avatar} />
                            </div>
                            <div className='flex flex-col items-start'>
                                <p className={"font-bold"}>{userInfo?.fullname} {feeling && <span>{feeling.emoji} <span className='font-light'>is feeling</span> {feeling.text}</span>}
                                {
                                    friendTagsPost?.length > 0 && <span> <span className='font-light'>with</span> {friendTagsPost?.map((friend: UserInfoMD) => friend.full_name).join(', ')}</span>
                                }
                                </p>
                                <div
                                    className={
                                        "flex items-center gap-1 py-1 px-2 bg-gray-300 rounded cursor-pointer"
                                    }
                                    onClick={handleClickStatusFeed}
                                >
                                    <FontAwesomeIcon
                                        icon={faEarth}
                                        size={"sm"}
                                        color={"#777777"}
                                    />
                                    <p className={"text-xs font-bold"}>Public</p>
                                    <FontAwesomeIcon icon={faCaretDown} size={"sm"} />
                                </div>
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
                                placeholder={`${userInfo?.fullname}, what are you thinking?`}
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
                                            <FontAwesomeIcon icon={faXmark} size={"sm"} />
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
                                                            <FontAwesomeIcon icon={faPlus} size={"sm"} color={"#777777"} />
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
                                                        <FontAwesomeIcon className={"me-2"} icon={faPlus} size={"sm"} />
                                                        <p>More Image</p>
                                                    </div>
                                                    <div
                                                        className={"py-1 px-2 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer border"}
                                                        onClick={() => {
                                                            setShowModalCreateFeed(false);
                                                            setShowModalEditImages(true);
                                                        }}>
                                                        <FontAwesomeIcon className={"me-2"} icon={faPencil} size={"sm"} />
                                                        <p>Edit Images</p>
                                                    </div>
                                                </div>
                                                <PostImages images={images} />
                                            </div>
                                        }
                                    </div>
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
                                        <FontAwesomeIcon icon={faPalette} color={"#197FE9"} />
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
                                            <FontAwesomeIcon icon={faSmile} size={"lg"} color={"orange"} />
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
