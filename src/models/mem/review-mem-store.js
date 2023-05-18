import { v4 } from "uuid";

let reviews = [];

export const reviewMemStore = {
    async getAllReviews() {
        return reviews;
    },

    async addReview(countryId, review) {
        review._id = v4();
        review.countryid = countryId;
        reviews.push(review);
        return review;
    },

    async getReviewsByCountryId(id) {
        return reviews.filter((review) => review.countryid === id);
    },

    async getReviewById(id) {
        let review = reviews.find((review) => review._id === id);
        if (review == undefined) {
            review = null;
        }
        return review;
    },

    async getCountryReviews(CountryId) {
        return reviews.filter((review) => review.countryid === countryId);
    },

    async deleteReview(id) {
        const index = reviews.findIndex((review) => review._id === id);
        if (index !== -1) reviews.splice(index, 1);
    },

    async deleteAllReviews() {
        reviews = [];
    },

    async updateReview(review, updatedReview) {
        review.title = updatedReview.title;
        review.comment = updatedReview.comment;
        review.rating = updatedReview.rating;
    },
};
