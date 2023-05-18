import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PointofinterestSpec, PointofinterestSpecPlus, PointofinterestArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const pointofinterestApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const pointofinterests = await db.pointofinterestStore.getAllPointofinterests();
                return pointofinterests;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: PointofinterestArraySpec, failAction: validationError },
        description: "Get all pointofinterestApi",
        notes: "Returns all pointofinterestApi",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.id);
                if (!pointofinterest) {
                    return Boom.notFound("No pointofinterest with this id");
                }
                return pointofinterest;
            } catch (err) {
                return Boom.serverUnavailable("No pointofinterest with this id");
            }
        },
        tags: ["api"],
        description: "Find a Pointofinterest",
        notes: "Returns a pointofinterest",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: PointofinterestSpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const pointofinterest = await db.pointofinterestStore.addPointofinterest(request.params.id, request.payload);
                if (pointofinterest) {
                    return h.response(pointofinterest).code(201);
                }
                return Boom.badImplementation("error creating pointofinterest");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a pointofinterest",
        notes: "Returns the newly created pointofinterest",
        validate: { payload: PointofinterestSpec },
        response: { schema: PointofinterestSpecPlus, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.pointofinterestStore.deleteAllPointofinterests();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all pointofinterestApi",
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.id);
                if (!pointofinterest) {
                    return Boom.notFound("No Pointofinterest with this id");
                }
                await db.pointofinterestStore.deletePointofinterest(pointofinterest._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Pointofinterest with this id");
            }
        },
        tags: ["api"],
        description: "Delete a pointofinterest",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },
};
