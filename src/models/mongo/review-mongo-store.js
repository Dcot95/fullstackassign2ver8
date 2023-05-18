import { Review } from "./review.js";
import { Country } from "./country.js";

export const reviewMongoStore = {
    async getAllReviews() {
        const reviews = await Review.find().lean();
        return reviews;
    },

    async addReview(countryId, review) {
        review.countryid = countryId;
        const newReview = new Review(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },

    async getReviewsByCountryId(id) {
        const reviews = await Review.find({ countryid: id }).lean();
        return reviews;
    },

    async getReviewById(id) {
        if (id) {
            const review = await Review.findOne({ _id: id }).lean();
            return review;
        }
        return null;
    },

    async deleteReview(id) {
        try {
            await Review.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllReviews() {
        await Review.deleteMany({});
    },

    async updateReview(review, updatedReview) {
        review.title = updatedReview.title;
        review.comment = updatedReview.comment;
        review.rating = updatedReview.rating;
        await review.save();
    },
};
