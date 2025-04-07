import sweeteAxiosInstance from "./domains/sweeteAxios"
export const fetchUserDetail = async (userID: number) => {
    return sweeteAxiosInstance.get('/api/v1/get-user-detail?id=' + userID)
}

export const fetchFriendsByParam = async (userID: number, fullName: string) => {
    return sweeteAxiosInstance.get('/api/v1/get-friends-by-param',{
        params: {
            user_id: userID,
            full_name: String(fullName)
        }
    })
}

export const fetchFriends = async (userID: number, limit: number) => {
    return sweeteAxiosInstance.get('/api/v1/get-friends-by-param',{
        params: {
            user_id: userID,
            limit: limit
        }
    })
}
export const getUserImages = async (userID: number, params?: { page: number; per_page: number }) => {
    return sweeteAxiosInstance.get(`/api/v1/get-user-images/${userID}`, {
        params: {
            page: params?.page || 1,
            per_page: params?.per_page || 8
        }
    })
}

export const updatePoster = async (data: any) => {
    return sweeteAxiosInstance.post('/api/v1/update-poster', data)
}