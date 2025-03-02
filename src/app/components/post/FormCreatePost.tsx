import AvatarUser from "@/app/components/avatar";
import { UserInfoLS } from "@/models";
import {
    faImages,
    faSmileBeam,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalChooseFriendExtract from "./Modals/ModalChooseFriendExtract";
import ModalChooseStatusFeed from "./Modals/ModalChooseStatusFeed";
import ModalCreateFeed from "./Modals/ModalCreateFeed";
import ModalEditImages from "./Modals/ModalEditImages";
import ModalTagFriends from "./Modals/ModalTagFriends";

export default function FormCreatePost(props: {
    userInfo: UserInfoLS
}) {
    const { userInfo } = props;

    const [showModalCreateFeed, setShowModalCreateFeed] =
        useState<boolean>(false);
    const [showModalChooseStatusFeed, setShowModalChooseStatusFeed] =
        useState<boolean>(false);
    const [showModalFriendExtract, setShowModalFriendExtract] =
        useState<boolean>(false);
    const [showModalEditImages, setShowModalEditImages] =
        useState<boolean>(false);
    const [showModalTagFriends, setShowModalTagFriends] =
        useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<any>(null)

    const [showAddImageToFeed, setShowAddImageToFeed] = useState<boolean>(false)
    const [showChooseBg, setShowChooseBg] = useState<boolean>(false);
    const [selectedBg, setSelectedBg] = useState<{
        bg: string;
        text: string;
    }>({ bg: "", text: "text-gray-900" });

    const [message, setMessage] = useState<string>("");
    const [images, setImages] = useState<any>([]);

    const handleClickCreateFeed = () => {
        setShowModalCreateFeed(true);
    };

    return (
        <>
            <style>
                {`
                    .custom-textarea::placeholder {
                      color: ${selectedBg.text};
                      opacity: 0.7; /* Giúp hiển thị placeholder rõ hơn */
                    }
                `}
            </style>
            <div className="flex flex-col gap-2 shadow-md border rounded-xl px-3 py-2">
                <div className="flex gap-2 items-center">
                    <div className="w-[40px] h-[40px] bg-infos rounded-full flex justify-center items-center">
                        <AvatarUser path={userInfo?.avatar} />
                    </div>
                    <div
                        onClick={handleClickCreateFeed}
                        className="text-gray-600 py-2 px-3 hover:bg-gray-200 cursor-pointer bg-infos rounded-3xl w-full"
                    >
                        {userInfo?.fullname}
                        , what are you thinking?
                    </div>
                </div>
                <hr />
                <div className="grid grid-cols-3 gap-4">
                    <div
                        className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
                        <FontAwesomeIcon icon={faImages} size="lg" color="#58C472" />
                        <p>Image</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
                        <FontAwesomeIcon icon={faVideo} size="lg" color="red" />
                        <p>Video</p>
                    </div>
                    <div
                        className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
                        <FontAwesomeIcon icon={faSmileBeam} size="lg" color="orange" />
                        <p>Emoji/activity</p>
                    </div>
                </div>
            </div>
            {
                showModalCreateFeed && <ModalCreateFeed
                    userInfo={userInfo}
                    selectedBg={selectedBg}
                    message={message}
                    images={images}
                    setImages={setImages}
                    setMessage={setMessage}
                    setSelectedBg={setSelectedBg}
                    setShowAddImageToFeed={setShowAddImageToFeed}
                    setShowChooseBg={setShowChooseBg}
                    setShowModalChooseStatusFeed={setShowModalChooseStatusFeed}
                    setShowModalCreateFeed={setShowModalCreateFeed}
                    setShowModalEditImages={setShowModalEditImages}
                    showAddImageToFeed={showAddImageToFeed}
                    showChooseBg={showChooseBg}
                    showModalCreateFeed={showModalCreateFeed}

                />
            }

            {
                showModalChooseStatusFeed && <ModalChooseStatusFeed
                    showModalChooseStatusFeed={showModalChooseStatusFeed}
                    setShowModalCreateFeed={setShowModalCreateFeed}
                    setShowModalChooseStatusFeed={setShowModalChooseStatusFeed}
                    setShowModalFriendExtract={setShowModalFriendExtract}
                />
            }

            {
                showModalFriendExtract && <ModalChooseFriendExtract
                    showModalFriendExtract={showModalFriendExtract}
                    setShowModalChooseStatusFeed={setShowModalChooseStatusFeed}
                    setShowModalFriendExtract={setShowModalFriendExtract}
                />
            }

            {
                showModalEditImages && <ModalEditImages
                    images={images}
                    setImages={setImages}
                    setCurrentImage={setCurrentImage}
                    currentImage={currentImage}
                    setShowModalCreateFeed={setShowModalCreateFeed}
                    setShowModalEditImages={setShowModalEditImages}
                    setShowModalTagFriends={setShowModalTagFriends}
                    showModalEditImages={showModalEditImages}
                />
            }

            {
                showModalTagFriends && <ModalTagFriends
                    userInfo={userInfo}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    setShowModalEditImages={setShowModalEditImages}
                    setShowModalTagFriends={setShowModalTagFriends}
                    showModalTagFriends={showModalTagFriends}
                />
            }
        </>
    )
}
