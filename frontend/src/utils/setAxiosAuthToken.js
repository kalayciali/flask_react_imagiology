import axios from "axios";

const setAxiosAuthToken = token => {
    if (typeof token != "undefined" && token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAxiosAuthToken
