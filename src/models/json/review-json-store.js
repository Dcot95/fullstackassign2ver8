import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/reviews.json"));
db.data = { reviews: [] };

export const reviewJsonStore = {
    async getAllReviews() {
        await db.read();
        return db.data.reviews;
    },

    async addReview(countryId, review) {
        await db.read();
        review._id = v4();
        review.countryid = countryId;
        db.data.reviews.push(review);
        await db.write();
        return review;
    },

    async getReviewsByCountryId(id) {
        await db.read();
        return db.data.reviews.filter((review) => review.countryid === id);
    },

    async getReviewById(id) {
        await db.read();
        let review = db.data.reviews.find((review) => review._id === id);
        if (review == undefined) {
            review = null;
        }
        return review;
    },

    async deleteReview(id) {
        await db.read();
        const index = db.data.reviews.findIndex((review) => review._id === id);
        if (index !== -1) db.data.reviews.splice(index, 1);
        await db.write();
    },

    async deleteAllReviews() {
        db.data.reviews = [];
        await db.write();
    },

    async updateReview(review, updatedReview) {
        review.title = updatedReview.title;
        review.comment = updatedReview.comment;
        review.rating = updatedReview.rating;
        await db.write();
    },
};
