/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

// CREATING AN INSTANCE OF AXIOS TO TREAT HEADERS
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

export default {
    service,
    // API CALL THAT WILL GET ORIGINAL PAGE OF FEEDBACK TO RENDER
    async getAllFeedbacks() {
        try {
            const request = await service.get('https://api.imcas.com/v1/feedbacks')
            return request.data;
        } catch (error) {
            errorHandler(error)
        }
    },
    // API CALL FOR BONUS PAGINATION OF FEEDBACKS 
    async getSelectedPageFeedbacks(page) {
        try {
            const request = await service.get(`https://api.imcas.com/v1/feedbacks?page=${page}`)
            return request.data;
        } catch (error) {
            errorHandler(error)
        }
    },
    // API CALL FOR SPECIFIC FEEDBACK
    async getOneFeedback(id) {
        try {
            const request = await service.get(`https://api.imcas.com/v1/feedbacks/${id}`)
            return request.data;
        } catch (error) {
            errorHandler(error)
        }
    },
}
