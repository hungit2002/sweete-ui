import sweeteUserAxiosInstance from "./sweeteService"
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
    return await sweeteUserAxiosInstance.post('/api/v1/login',body)
}