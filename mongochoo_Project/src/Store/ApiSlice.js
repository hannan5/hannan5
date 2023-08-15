import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseurl = `http://admin.mchongoo.com/`

export const getTokenFromLocalStorage = async () => {
    const token = await AsyncStorage.getItem('token');
};
// getTokenFromLocalStorage()
export const ServicesApi = createApi({
    reducerPath: 'ServicesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseurl}/api`,
    }),
    endpoints: (builders) => ({
        getServiceFilter: builders.query({
            query: (args) => {
                return {
                    url: `service`,
                    method: 'Get',
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                    },
                }
            },
        }),

    })
})

export const { useGetServiceFilterQuery } = ServicesApi;