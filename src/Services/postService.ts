import sweeteAxiosInstance from "@/Services/domains/sweeteAxios";
import {PostFormBody} from "@/models";

export const createPost = async (body: PostFormBody) => {
    return sweeteAxiosInstance.post('/api/v1/create-post', body)
}