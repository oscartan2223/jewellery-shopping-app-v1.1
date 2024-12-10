import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use(function(config) {
    // config.headers.Authorization = 'Bearer ' + getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
    return response.data;
}, function(error) {
    return Promise.reject(error);
});

const request = {
    get: (url, params) => api.get(url, { params }),
    post: (url, data) => api.post(url, data),
    put: (url, data) => api.put(url, data),
    delete: (url, params) => api.delete(url, { params })
};

export class UserService {
    static loginAccount(account, password){
        return request.get(`/login/${account}/${password}`);
    }

    static resetPassword(data){
        return request.put('/resetpassword', data);
    }
}