export interface UserInfoLS {
    id: number;
    full_name: string;
    email: string;
    avatar: string;
    phone: string;
}
export interface UserInfoMD {
    id: number;
    phone: string;
    email: string;
    full_name: string;
    address: string;
    education_info: string;
    work_info: string;
    gender: number; // 1: Male, 0: Female
    relationship: number; // 0: Single, 1: Married, etc.
    dob: string;
    avatar: string;
    poster: string;
    password: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    friends: Friend[] | null;
}

export interface Friend {
    user_id: number;
    friend_id: number;
    status: number; // 1: Accepted, 2: Pending
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    user: UserInfoMD | null;
}

export interface FEED_STATUS {
    icon: any,
    label: string,
    detail?: string,
    id: number,
    value: number
}

export interface Image {
    url: string;
    size: number;
    type: string;
    name: string;
    note: string;
    friends: number[];
}

export interface PostFormBody {
    user_id: number;
    content: string;
    images: Image[];
    friends: number[];
    feeling: number;
    status: {
        type: number;
        friend_expect: number[];
        friend_only: number[];
    },
    background: string,
    checkin: string,
}