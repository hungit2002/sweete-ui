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

export const EMOJIS = ["😀", "😂", "🥰", "😎", "😭", "👍"]

export const FEED_STATUS_PUBLIC = "PUBLIC";
export const FEED_STATUS_FRIEND = "FRIEND";
export const FEED_STATUS_FRIEND_EXTRACT = "FRIEND_EXTRACT";
export const FEED_STATUS_ONLY_ME = "only_me";
export const FEED_STATUS_FRIEND_SPECIFIC = "FRIEND_SPECIFIC";
export const FEED_STATUS_CUSTOM = "CUSTOM"

export const LIST_STATUS_FEEDS: FEED_STATUS[] = [{
    icon: faEarth,
    label: "Public",
    detail : "Anyone on or off Sweete",
    id : "public",
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
},{
    icon: faGear,
    label: "Custom",
    id : FEED_STATUS_CUSTOM,
    value: FEED_STATUS_CUSTOM
}]