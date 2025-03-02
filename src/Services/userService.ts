import sweeteUserAxiosInstance from "./sweeteService"
export const fetchUserDetail = async (userID: number) => {
    return sweeteUserAxiosInstance.get('/api/v1/get-user-detail?id=' + userID)
}

export const fetchFriendsByParam = async (userID: number, fullName: string) => {
    return sweeteUserAxiosInstance.get('/api/v1/get-friends-by-param',{
        params: {
            user_id: userID,
            full_name: String(fullName)
        }
    })
}