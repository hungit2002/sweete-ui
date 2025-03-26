interface Background {
    bg: string;
    text: string;
}

interface Checkin {
    status: string;
    continent: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    district: string;
    zip: string;
    timezone: string;
    currency: string;
    isp: string;
    org: string;
}

interface Tag {
    id: number;
    full_name: string;
    avatar: string | null;
    pivot: {
        "tags.post_id": number;
        "tags.user_id": number;
    };
}

interface Image {
    id: number;
    path: string;
    origin_name: string;
    note: string | null;
    post_id: number;
    type: string;
    tag_images: any[];
}

interface User {
    id: number;
    full_name: string;
    avatar: string | null;
}

interface Post {
    id: number;
    content: string;
    status: number;
    background: Background;
    user_id: number;
    feeling: number;
    checkin: Checkin;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    friends_view: number[];
    friends_expect: number[];
    tags: Tag[];
    images: Image[];
    user: User;
    hashtags: string[];
}