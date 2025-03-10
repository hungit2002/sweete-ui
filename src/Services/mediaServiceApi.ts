import mediaService from "./mediaService";

export const fetchGifs = async () => {
    return mediaService.get("list-gif?folder=gifs");
}
export const uploadImage = async (image: File, folder: string = "") => {
    const formData = new FormData();
    formData.append("file", image);
    return mediaService.post("upload-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}