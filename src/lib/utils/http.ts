import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';


const processError = (error: AxiosError) => {
    const errorData = error.response?.data as Record<any, any>;
    const errorMessage = errorData?.message || 'Something went wrong, try again';
    const errorDescription = errorData?.messages ? errorData?.messages?.join(`; `) : null;

    return {
        message: errorMessage,
        description: errorDescription,
    };
};



// Create a new Axios instance
const http: AxiosInstance = axios.create({
    baseURL: '/api',
});


http.interceptors.response.use(
    (response: AxiosResponse) => {
        // Modify the response data here (e.g., transform, filter)
        return response;
    },
    (error: any) => {
        // Handle response error here
        if (error.response && error.response.status === 401) {
            // Redirect to the logout page
            window.location.href = '/app/logout';
        }

        const pError = processError(error);
        return Promise.reject(pError);
    }
);

export default http