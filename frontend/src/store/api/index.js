import axios from "axios";


export const apiPost = async(url, data) => {
    try {
        const response = await axios.post(url, data)
        return response.data
    } catch(error) {
        throw error
    }
}


export const apiGet = async(url) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch(error) {
        throw error
    }
}
