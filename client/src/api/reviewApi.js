import axios from "./axiosClient"

export const getReviews = (productId) => {
    return axios.get(`/api/review/${productId}`)
}

export const postReview = (review) => {
    return axios.post(`/api/review`, review)
}