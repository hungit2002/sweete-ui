import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEarth,
  faEllipsis,
  faGift,
  faImages,
  faLocationDot,
  faMinus,
  faMinusCircle,
  faPalette,
  faSmile,
  faSmileBeam,
  faUserTag,
  faVideo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import News from "@/app/Modules/Home/News";
import Feed from "@/app/Modules/Home/Feeds/Feed";
import { FEED_STATUS, UserInfoLS } from "@/models";
import AvatarUser from "@/app/components/avatar";
import {
  BACKGROUND_FEEDS,
  EMOJIS,
  FEED_STATUS_FRIEND_EXTRACT,
  LIST_STATUS_FEEDS,
} from "@/constant";
import ModalDefault from "@/app/components/modal/ModalDefault";
import Tippy from "@tippyjs/react/headless";
import { useForm } from "react-hook-form";

interface IFromRadio {
  status: string;
}

function HomeFeeds(props: { userInfo: UserInfoLS }) {
  const { userInfo } = props;
  const [showPickerEmoji, setShowPickerEmoji] = useState<boolean>(false);
  const [showModalCreateFeed, setShowModalCreateFeed] =
    useState<boolean>(false);
  const [showModalChooseStatusFeed, setShowModalChooseStatusFeed] =
    useState<boolean>(false);
  const [showModalFriendExtract, setShowModalFriendExtract] =
    useState<boolean>(false);

  const [showChooseBg, setShowChooseBg] = useState<boolean>(false);

  const [selectedBg, setSelectedBg] = useState<{
    bg: string;
    text: string;
  }>({ bg: "", text: "text-gray-900" });
  const [message, setMessage] = useState<string>("");

  const [array, setArray] = useState<any>([
    {
      id: 1,
      fullname: "hung tran duy 1",
      email: "",
      avatar: "",
      phone: "099786857",
      status: 0,
      address: "Ha Noi",
    },
    {
      id: 2,
      fullname: "hung tran duy 2",
      email: "",
      avatar: "",
      phone: "099786857",
      status: 0,
      address: "Ha Noi",
    },
    {
      id: 3,
      fullname: "hung tran duy 3",
      email: "",
      avatar: "",
      phone: "099786857",
      status: 0,
      address: "Ha Noi",
    },
  ]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { register, handleSubmit } = useForm<IFromRadio>();

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      setMessage((prev) => prev.slice(0, start) + emoji + prev.slice(end));

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

  const handleClickCreateFeed = () => {
    setShowModalCreateFeed(true);
  };

  const handleCloseModalCreateFeed = () => {
    setShowModalCreateFeed(false);
  };

  const handleCloseModalChooseStatusFeed = () => {
    setShowModalChooseStatusFeed(false);
    setShowModalCreateFeed(true);
  };

  const handleClickStatusFeed = () => {
    setShowModalCreateFeed(false);
    setShowModalChooseStatusFeed(true);
  };

  const handleCloseModalFriendExtract = () => {
    setShowModalFriendExtract(false);
    setShowModalChooseStatusFeed(true);
  };

  useEffect(() => {
    const textarea = document.getElementById("message") as HTMLTextAreaElement;
    if (textarea) {
      textareaRef.current = textarea;
    }
  }, []);

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
      <div className="mt-3 max-w-[597px] mx-auto">
        <div className="flex flex-col gap-2 shadow-md border rounded-xl px-3 py-2">
          <div className="flex gap-2 items-center">
            <div className="w-[40px] h-[40px] bg-infos rounded-full flex justify-center items-center">
              <img
                src={
                  `${userInfo?.avatar}` ||
                  "https://www.svgrepo.com/show/452030/avatar-default.svg"
                }
                alt="avatar"
                className="object-cover rounded-full w-100 h-100"
              />
            </div>
            <div
              onClick={handleClickCreateFeed}
              className="text-gray-600 py-2 px-3 hover:bg-gray-200 cursor-pointer bg-infos rounded-3xl w-full"
            >
              {localStorage.getItem("user_info") &&
                JSON.parse(localStorage.getItem("user_info") || "{}")?.fullname}
              , what are you thinking?
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
              <FontAwesomeIcon icon={faImages} size="lg" color="#58C472" />
              <p>Image</p>
            </div>
            <div className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
              <FontAwesomeIcon icon={faVideo} size="lg" color="red" />
              <p>Video</p>
            </div>
            <div className="flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer rounded py-2 px-3">
              <FontAwesomeIcon icon={faSmileBeam} size="lg" color="orange" />
              <p>Emoji/activity</p>
            </div>
          </div>
        </div>
        <News userInfo={userInfo} />
        <div className={"mt-3 flex flex-col gap-3"}>
          <Feed
            text={
              "Những thông tin về tiến độ của các dự án nhà ở xã hội ngay trong những ngày\n" +
              "                        đầu năm mới này đã thổi một luồng gió hứng khởi, tích cực đến thị trường bất\n" +
              "                        động sản. Nhiều chuyên gia nhận định, sự xuất hiện của các căn hộ nhà ở xã\n" +
              "                        hội với giá bán chỉ bằng 1/2, thậm chí 1/3 so với nhà ở thương mại, sẽ tạo\n" +
              "                        sự lan tỏa, phần nào giúp bình ổn giá chung cư."
            }
            maxLength={200}
            hashtags={["home", "social"]}
            images={[
              {
                url: "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/479494592_943006054681164_5352145709286615891_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFZkf5dZmyd_wl0MFV3aeN5TXL95fOQfMlNcv3l85B8ydKZGjWRLAdttk-f01vzMZ4A8paY9ag-6vuw5-pU7w9r&_nc_ohc=ESNoBk3y7q8Q7kNvgG2aKFe&_nc_oc=Adg0o67g87lShkjrmlrmWsDM8eWlNeUE2RFJMNbKmySn6yXbUY-joRcJPRjD8NnXPB8&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AFlEsl5rqAIaww2J-rQXgzj&oh=00_AYA9k9pvYVDqA5-ZsEtYHg4OcdiS-cUxDkpNDNqUII-TJg&oe=67B56516",
              },
            ]}
          />
          <Feed
            text={
              "Những thông tin về tiến độ của các dự án nhà ở xã hội ngay trong những ngày\n" +
              "                        đầu năm mới này đã thổi một luồng gió hứng khởi, tích cực đến thị trường bất\n" +
              "                        động sản. Nhiều chuyên gia nhận định, sự xuất hiện của các căn hộ nhà ở xã\n" +
              "                        hội với giá bán chỉ bằng 1/2, thậm chí 1/3 so với nhà ở thương mại, sẽ tạo\n" +
              "                        sự lan tỏa, phần nào giúp bình ổn giá chung cư."
            }
            maxLength={200}
            hashtags={["home", "social"]}
            images={[
              {
                url: "https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/479494592_943006054681164_5352145709286615891_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFZkf5dZmyd_wl0MFV3aeN5TXL95fOQfMlNcv3l85B8ydKZGjWRLAdttk-f01vzMZ4A8paY9ag-6vuw5-pU7w9r&_nc_ohc=ESNoBk3y7q8Q7kNvgG2aKFe&_nc_oc=Adg0o67g87lShkjrmlrmWsDM8eWlNeUE2RFJMNbKmySn6yXbUY-joRcJPRjD8NnXPB8&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AFlEsl5rqAIaww2J-rQXgzj&oh=00_AYA9k9pvYVDqA5-ZsEtYHg4OcdiS-cUxDkpNDNqUII-TJg&oe=67B56516",
              },
            ]}
          />
        </div>
      </div>
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
                <AvatarUser userInfo={userInfo} />
              </div>
              <div>
                <p className={"font-bold"}>{userInfo?.fullname}</p>
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
              ></textarea>
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
                  <Tippy
                    interactive={true}
                    visible={showPickerEmoji}
                    onClickOutside={() => setShowPickerEmoji(false)}
                    render={(attrs: any) => (
                      <div
                        {...attrs}
                        tabIndex={-1}
                        className={
                          "bg-white border p-2 rounded shadow w-[300px] h-[200px]"
                        }
                      >
                        {EMOJIS.map((emoji: string, index: number) => (
                          <button
                            key={index}
                            className="p-1 text-lg hover:bg-gray-200 rounded"
                            onClick={() => {
                              insertEmoji(emoji);
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  >
                    <div className="px-2 py-1 rounded cursor-pointer bg-white border">
                      <FontAwesomeIcon
                        icon={faSmile}
                        size={"lg"}
                        className={"cursor-pointer"}
                        color={"orange"}
                        onClick={() => setShowPickerEmoji(!showPickerEmoji)}
                      />
                    </div>
                  </Tippy>
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
      {/* Modal choose friend extract */}
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
              />
            </div>
            <h1 className="font-bold">Friends</h1>
            <div>
              <ul className="my-3 flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                {array.map((item: any, index: number) => (
                  <li
                    className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    key={index}
                    onClick={() => {
                      setArray((prev: any) => [
                        ...prev.map((i: any) =>
                          i.id === item.id
                            ? { ...i, status: i.status === 0 ? 1 : 0 }
                            : i
                        ),
                      ]);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-[40px] h-[40px] border rounded-full">
                        <AvatarUser
                          userInfo={{
                            id: 1,
                            fullname: "hung tran duy",
                            email: "h@gmail.com",
                            avatar: "",
                            phone: "099786857",
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{item.fullname}</p>
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
            </div>
            {array.filter((item: any) => item.status === 1).length > 0 && (
              <>
                <hr />
                <div className="my-2 p-2">
                  <div className="border rounded-lg p-2 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                    <p className="text-sm font-thin">
                      Friend don't see the feed
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {array
                        ?.filter((friend: any) => friend.status === 1)
                        ?.map((fb: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 py-1 px-2 rounded bg-blue-100 cursor-pointer"
                            onClick={() => {
                              setArray((prev: any) => [
                                ...prev.map((i: any) =>
                                  i.id === fb.id
                                    ? { ...i, status: i.status === 0 ? 1 : 0 }
                                    : i
                                ),
                              ]);
                            }}
                          >
                            <div className="w-[20px] h-[20px] border rounded-full">
                              <AvatarUser userInfo={fb} />
                            </div>
                            <p className="text-blue-800">{fb.fullname}</p>
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
  );
}

export default HomeFeeds;
