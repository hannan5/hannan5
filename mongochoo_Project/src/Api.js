import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseurl = `http://admin.mchongoo.com/api/`
export const imgbaseurl = `http://admin.mchongoo.com/storage/`


export const signup = (body) => {
    try {
        let res = axios.post(`${baseurl}register`, body)
        return res;
    } catch (error) {
        return error;
    }
}
export const login = (body) => {
    try {
        let res = axios.post(`${baseurl}login`, body)
        return res;
    } catch (error) {
        return error;
    }
}

export const sendOtp = (body) => {
    try {
        let res = axios.post(`${baseurl}generateOtp`, body)
        return res;
    } catch (error) {
        return error;
    }
}

export const matchOtp = (body) => {
    try {
        let res = axios.post(`${baseurl}matchOtp`, body)
        return res;
    } catch (error) {
        return error;
    }
}

export const ResendOtp = (body) => {
    try {
        let res = axios.post(`${baseurl}resendOtp`, body)
        return res;
    } catch (error) {
        return error;
    }
}

export const UploadKYC = async (formData) => {
    try {
        const res = await axios.post(`${baseurl}uploadKYC`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });

        return res
    } catch (error) {
        // console.log(error, "error");
        return error;
    }
}
export const accountUsage = body => {
    try {
        let res = axios.post(`${baseurl}accountUsage`, body)
        return res;
    } catch (error) {
        console.log(error, "error");
        return error;
    }
}
export const GetInterst = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}category`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const PostInterst = async (body) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.post(`${baseurl}category`, { categories: body }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}


export const GetService = async (param) => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    try {
        let res = axios.get(`${baseurl}service?serviceParam=${param}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const GetSingleService = async (id) => {
    const token = await AsyncStorage.getItem('token')
    // console.log(token)
    try {
        let res = axios.get(`${baseurl}single/service/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const GetFavouriteService = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}favouriteService`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const PostFavouriteService = async (body) => {

    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.post(`${baseurl}favouriteService`, body, {
            headers: { Authorization: `Bearer ${token}` },
        },)
        return res;
    } catch (error) {
        return error;
    }
}

export const SearchService = async (name) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}search/service/?name=${name}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const CreateOrder = async (body) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.post(`${baseurl}create/orders`, body, {
            headers: { Authorization: `Bearer ${token}` },
        })
        // console.log(res, "res")
        return res;
    } catch (error) {
        // console.log(error?.response, "error")
        return error;
    }
}

export const getCart = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}user/cart`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const DeleteCart = async (id) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}delete/cart/item/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const getPayment = async (body) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.post(`${baseurl}create/payment/url`,body, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const getCategory = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}category`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const getServiceByCategory = async (id) => {
    const token = await AsyncStorage.getItem('token')
    try {
        let res = axios.get(`${baseurl}service/by/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}