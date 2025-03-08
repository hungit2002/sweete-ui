import mediaService from "./mediaService";
export const fetchGifs = async () => {
    return mediaService.get("list-gif");
}