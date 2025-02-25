import sweeteUserAxiosInstance from "./sweeteService"
export const fetchUserDetail = async (userID: number) => {
    return sweeteUserAxiosInstance.get('/api/v1/get-user-detail?id=' + userID)
}