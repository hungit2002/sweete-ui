import axios from "axios";

export function ConvertBlobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, {type: blob.type});
}

export const UploadImage = (file: File) => {
    const apiURL: string = process.env.NEXT_PUBLIC_DOMAIN_MEDIA || "";
    console.log(apiURL)
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(apiURL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};