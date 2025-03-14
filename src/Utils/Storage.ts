export const getUserInfoLS = () => {
    return JSON.parse(localStorage.getItem("user_info") || "{}");
}