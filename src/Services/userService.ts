import sweeteAxiosInstance from "./sweeteService"
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