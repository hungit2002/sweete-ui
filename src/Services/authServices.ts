import sweeteAxiosInstance from "./domains/sweeteAxios"
export const login = async (account:string, password:string) => {
    let body = {}
    if (account.includes("@")) {
        body = {
            email:account,
            password
        }
    }else {
        body = {
            phone: account,
            password
        }
    }
    return await sweeteAxiosInstance.post('/api/v1/login',body)
}