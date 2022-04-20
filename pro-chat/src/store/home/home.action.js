import axios from "../axios.js";

export const getChatData = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.get("/home")
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}
