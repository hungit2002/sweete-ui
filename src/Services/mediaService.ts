import mediaAxios from "./domains/mediaAxios";

export const fetchGifs = async () => {
    return mediaAxios.get("list-gif?folder=gifs");
}
export const uploadImage = async (image: File, folder: string = "") => {
    const formData = new FormData();
    formData.append("file", image);
    return mediaAxios.post("upload-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}