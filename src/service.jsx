import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000000,
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

export class OTPService {
    static generateOTP(data) {
        return request.post('/otp', data)
    }
}

export class UserService {
    static registerBusiness(data) {
        return request.post('/registerbusiness', data);
    }

    static loginAccount(account, password){
        return request.get(`/login/${account}/${password}`);
    }

    static resetPassword(data){
        return request.put('/resetpassword', data);
    }
}

// export class RoleService {
//     static createRole(data) {
//         return request.post('/roles', data);
//     }

//     static getRoleById(id) {
//         return request.get(`/roles/${id}`);
//     }

//     static updateRole(id, data) {
//         return request.put(`/roles/${id}`, data);
//     }

//     static deleteRole(id) {
//         return request.delete(`/roles/${id}`);
//     }
// }

// export class UserService {
//     static createUser(data) {
//         return request.post('/users', data);
//     }

//     static getUserById(id) {
//         return request.get(`/users/${id}`);
//     }

//     static updateUser(id, data) {
//         return request.put(`/users/${id}`, data);
//     }

//     static deleteUser(id) {
//         return request.delete(`/users/${id}`);
//     }
// }

// export class ProductService {
//     static createProduct(data) {
//         return request.post('/products', data);
//     }

//     static getProductById(id) {
//         return request.get(`/products/${id}`);
//     }

//     static updateProduct(id, data) {
//         return request.put(`/products/${id}`, data);
//     }

//     static deleteProduct(id) {
//         return request.delete(`/products/${id}`);
//     }
// }

// export class CategoryService {
//     static createCategory(data) {
//         return request.post('/categories', data);
//     }

//     static getCategoryById(id) {
//         return request.get(`/categories/${id}`);
//     }

//     static updateCategory(id, data) {
//         return request.put(`/categories/${id}`, data);
//     }

//     static deleteCategory(id) {
//         return request.delete(`/categories/${id}`);
//     }
// }

// export class StockMovementService {
//     static addStockMovement(data) {
//         return request.post('/stock_movements', data);
//     }

//     static getStockMovementById(id) {
//         return request.get(`/stock_movements/${id}`);
//     }

//     static updateStockMovement(id, data) {
//         return request.put(`/stock_movements/${id}`, data);
//     }

//     static deleteStockMovement(id) {
//         return request.delete(`/stock_movements/${id}`);
//     }
// }

// export class OrderService {
//     static createOrder(data) {
//         return request.post('/orders', data);
//     }

//     static getOrderById(id) {
//         return request.get(`/orders/${id}`);
//     }

//     static updateOrder(id, data) {
//         return request.put(`/orders/${id}`, data);
//     }

//     static deleteOrder(id) {
//         return request.delete(`/orders/${id}`);
//     }
// }

// export class OrderDetailService {
//     static createOrderDetail(data) {
//         return request.post('/order_details', data);
//     }

//     static getOrderDetailById(id) {
//         return request.get(`/order_details/${id}`);
//     }

//     static updateOrderDetail(id, data) {
//         return request.put(`/order_details/${id}`, data);
//     }

//     static deleteOrderDetail(id) {
//         return request.delete(`/order_details/${id}`);
//     }
// }