export interface UserInfoLS {
    id: number;
    fullname: string;
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
    id: string,
    value: string
}