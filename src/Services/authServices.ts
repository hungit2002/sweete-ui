import sweeteAxiosInstance from "./sweeteService"
export const login = async (email:string, password:string) => {
    return await sweeteAxiosInstance.post('/api/v1/login',{
        email,
        password
    })
}