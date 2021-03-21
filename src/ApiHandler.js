/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const service = axios.create({
    baseURL: "https://api.imcas.com/v1/feedbacks",
});

// FUNCTION THAT WILL HANDLE ALL ERRORS IN API CALLS
function errorHandler(error) {
    if (error.response) {
        console.log(error.response)
        throw error
    }
    throw error
}


export async function getFeedback({ id, page }) {
    const urlEnding = id ? { url: `/${id}` } : page ? { params: { page } } : {};
    try {
        const { data } = await service.request({ method: 'get', ...urlEnding })
        return data;
    } catch (error) {
        errorHandler(error)
    }
}
