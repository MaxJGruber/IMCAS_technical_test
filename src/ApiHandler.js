/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const service = axios.create({
    headers: { 'Access-Control-Allow-Origin': "*", "Content-Type": "application/json" },
    credentials: 'same-origin',
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
    const urlEnding = id ? `/${id}` : page ? `?page=${page}` : '';
    try {
        const { data } = await service.get(`https://api.imcas.com/v1/feedbacks${urlEnding}`)
        return data;
    } catch (error) {
        errorHandler(error)
    }
}
