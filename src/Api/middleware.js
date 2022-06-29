import axios from "axios";

export const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== "api/apiCall") {
        next(action)
        return
    }
    next(action)
    const {url, method, data, onSuccess, onFail} = action.payload
    axios({
        baseURL: 'http://localhost:3001/api',
        url, method, data
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    })
}
export default api