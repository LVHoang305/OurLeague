import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

instance.interceptors.request.use(function (config) {

    let token = localStorage.getItem('persist:auth') && JSON.parse(localStorage.getItem('persist:auth'))?.token?.slice(1,-1)
    config.headers = {
        authorization: token ?  `Bearer ${token}` : null
    }
    return config;
    }, function(error) {;
        return Promise.reject(error);
    });

instance.interceptors.request.use(function (response) {
    return response;

}, function(error){
    return Promise.reject(error);
});
export default instance