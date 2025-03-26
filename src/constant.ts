import {
    faEarth,
    faFilterCircleXmark,
    faGear,
    faHandPointDown,
    faLock,
    faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import {FEED_STATUS} from "@/models";

export const BACKGROUND_FEEDS = [
    { bg: "white", text: "black" },
    { bg: "linear-gradient(to right, #ff4e50, #f9d423)", text: "white" },
    { bg: "linear-gradient(to right, #2193b0, #6dd5ed)", text: "white" },
    { bg: "linear-gradient(to right, #11998e, #38ef7d)", text: "white" },
    { bg: "linear-gradient(to right, #ff9966, #ff5e62)", text: "black" },
    { bg: "linear-gradient(to right, #8e2de2, #4a00e0)", text: "white" }
]

export const EMOJIS = [
    "😀", "😂", "🥰", "😎", "😭", "👍",
    "😊", "😍", "🤣", "😅", "😁", "😢", "😜", "🤔", "🤩", "😇",
    "😡", "🥺", "😋", "🤗", "😱", "🙃", "😏", "😒", "😌", "🤭",
    "😃", "😆", "😝", "🤤", "🥳", "🥴", "😤", "😵", "🤯", "🤠",
    "👀", "👋", "🙌", "👏", "💪", "🙏", "🔥", "💯", "🎉", "🎊",
    "🎶", "💖", "💔", "💕", "💗", "💙", "💚", "💛", "🖤", "💜"
];

export const FEED_STATUS_PUBLIC = 0;
export const FEED_STATUS_FRIEND = 1;
export const FEED_STATUS_ONLY_ME = 2;
export const FEED_STATUS_FRIEND_SPECIFIC = 3;
export const FEED_STATUS_FRIEND_EXTRACT = 4;
export const FEED_STATUS_CUSTOM = 5

export const LIST_STATUS_FEEDS: FEED_STATUS[] = [{
    icon: faEarth,
    label: "Public",
    detail : "Anyone on or off Sweete",
    id : FEED_STATUS_PUBLIC,
    value: FEED_STATUS_PUBLIC
},{
    icon: faUserFriends,
    label: "Friends",
    detail : "Your friends on Sweete",
    id : FEED_STATUS_FRIEND,
    value: FEED_STATUS_FRIEND
},{
    icon: faFilterCircleXmark,
    label: "Friends except ...",
    detail : "Not visible to some friends",
    id : FEED_STATUS_FRIEND_EXTRACT,
    value: FEED_STATUS_FRIEND_EXTRACT
},{
    icon: faLock,
    label: "Only me",
    id : FEED_STATUS_ONLY_ME,
    value: FEED_STATUS_ONLY_ME
},{
    icon: faHandPointDown,
    label: "Friend Specific",
    id : FEED_STATUS_FRIEND_SPECIFIC,
    value: FEED_STATUS_FRIEND_SPECIFIC
}
,{
    icon: faGear,
    label: "Custom",
    id : FEED_STATUS_CUSTOM,
    value: FEED_STATUS_CUSTOM
}
]
export interface Feeling {
    id: number;
    emoji: string;
    text: string;
}
export const FEELING_LIST = [
    { id: 1, emoji: "😊", text: "happy" },
    { id: 2, emoji: "🥰", text: "loved" },
    { id: 3, emoji: "🥰", text: "adorable" },
    { id: 4, emoji: "😆", text: "excited" },
    { id: 5, emoji: "🤪", text: "crazy" },
    { id: 6, emoji: "😄", text: "delighted" },
    { id: 7, emoji: "😌", text: "healthy" },
    { id: 8, emoji: "😎", text: "awesome" },
    { id: 9, emoji: "😃", text: "interesting" },
    { id: 10, emoji: "😇", text: "blessed" },
    { id: 11, emoji: "😢", text: "sad" },
    { id: 12, emoji: "🙏", text: "grateful" },
    { id: 13, emoji: "🥰", text: "in love" },
    { id: 14, emoji: "🥹", text: "appreciative" },
    { id: 15, emoji: "😎", text: "amazing" },
    { id: 16, emoji: "🎉", text: "joyful" },
    { id: 17, emoji: "😎", text: "cool" },
    { id: 18, emoji: "😌", text: "relaxed" },
    { id: 19, emoji: "🙂", text: "positive" },
    { id: 20, emoji: "🌷", text: "hopeful" },
    { id: 21, emoji: "😔", text: "tired" },
    { id: 22, emoji: "😌", text: "proud" },
    { id: 23, emoji: "🤔", text: "thoughtful" },
    { id: 24, emoji: "🧐", text: "nostalgic" },
    { id: 25, emoji: "🤒", text: "sick" },
    { id: 26, emoji: "😫", text: "exhausted" },
    { id: 27, emoji: "😏", text: "confident" },
    { id: 28, emoji: "😌", text: "comfortable" },
    { id: 29, emoji: "🥳", text: "cheerful" },
    { id: 30, emoji: "😞", text: "motivated" },
    { id: 31, emoji: "😔", text: "lonely" },
    { id: 32, emoji: "🆗", text: "OK" },
    { id: 33, emoji: "😠", text: "angry" },
    { id: 34, emoji: "😀", text: "satisfied" },
    { id: 35, emoji: "😢", text: "emotional" },
    { id: 36, emoji: "😃", text: "amazing" }
];

export const AvatarDefault = "https://res.cloudinary.com/dkxleddkw/image/upload/v1741586469/uploads/dujv7ajztgx2lzybjxez.png"

export const TYPE_IMAGE_GIF = "gif";