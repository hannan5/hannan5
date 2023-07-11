import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseurl = `http://admin.mchongoo.com/api/`

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
    console.log(formData);
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
        let res = axios.get(`${baseurl}interest`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}

export const PostInterst = async (body) => {
    const token = await AsyncStorage.getItem('token')
    // console.log({ interests: body });
    try {
        let res = axios.post(`${baseurl}interest`, { interests: body }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res;
    } catch (error) {
        return error;
    }
}