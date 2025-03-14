import axios from "axios";

export const getLocal = (ip: string) => {
    axios.get(`http://ip-api.com/json/${ip}?fields=status,message,continent,country,countryCode,region,regionName,city,district,zip,timezone,currency,isp,org`).then(res => {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}
export const getIp = () => {
    axios.get(`https://api.ipify.org?format=json`).then(res => {
        if (res.status === 200) {
            getLocal(res.data.ip);
        }
    }).catch(err => {
        console.log(err);
    })
}
