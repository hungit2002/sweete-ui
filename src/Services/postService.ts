import sweeteAxiosInstance from "@/Services/domains/sweeteAxios";
import {PostFormBody} from "@/models";

export const createPost = async (body: PostFormBody) => {
    return sweeteAxiosInstance.post('/api/v1/create-post', body)
}

export const getListPost = async (page: number = 1) => {
    return sweeteAxiosInstance.get(`/api/v1/get-list-post?page=${page}`);
}