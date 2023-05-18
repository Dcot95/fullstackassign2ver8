import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ReviewSpec, ReviewSpecPlus, ReviewArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const reviewApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const reviews = await db.reviewStore.getAllReviews();
                return reviews;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: ReviewArraySpec, failAction: validationError },
        description: "Get all reviewApi",
        notes: "Returns all reviewApi",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const review = await db.reviewStore.getReviewById(request.params.id);
                if (!review) {
                    return Boom.notFound("No review with this id");
                }
                return review;
            } catch (err) {
                return Boom.serverUnavailable("No review with this id");
            }
        },
        tags: ["api"],
        description: "Find a Review",
        notes: "Returns a review",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: ReviewSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const review = await db.reviewStore.addReview(request.params.id, request.payload);
                if (review) {
                    return h.response(review).code(201);
                }
                return Boom.badImplementation("error creating review");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a review",
        notes: "Returns the newly created review",
        validate: { payload: ReviewSpec },
        response: { schema: ReviewSpecPlus, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.reviewStore.deleteAllReviews();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all reviewApi",
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const review = await db.reviewStore.getReviewById(request.params.id);
                if (!review) {
                    return Boom.notFound("No Review with this id");
                }
                await db.reviewStore.deleteReview(review._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Review with this id");
            }
        },
        tags: ["api"],
        description: "Delete a review",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
};
