import { ReviewSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const reviewController = {
    index: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const review = await db.reviewStore.getReviewById(request.params.reviewid);
            const viewData = {
                title: "Edit Review",
                country: country,
                review: review,
            };
            return h.view("review-view", viewData);
        },
    },

    update: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("review-view", { title: "Edit review error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const review = await db.reviewStore.getReviewById(request.params.reviewid);
            const newReview = {
                title: request.payload.title,
                comment: request.payload.comment,
                rating: Number(request.payload.rating),
            };
            await db.reviewStore.updateReview(review, newReview);
            return h.redirect(`/country/${request.params.id}`);
        },
    },
};
