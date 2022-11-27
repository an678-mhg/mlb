const convertReview = (review) => {
    if(review == 1) {
        return "⭐"
    }
    else if(review == 2) {
        return "⭐ ⭐"
    }
    else if(review == 3) {
        return "⭐ ⭐ ⭐"
    }
    else if(review == 4) {
        return "⭐ ⭐ ⭐ ⭐"
    }
    else {
        return "⭐ ⭐ ⭐ ⭐ ⭐"
    }
}


export default convertReview