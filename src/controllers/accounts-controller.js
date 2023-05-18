import bcrypt from "bcrypt";
import validator from "validator";
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const saltRounds = 10;

export const accountsController = {
    index: {
        auth: false,
        handler: function (request, h) {
            return h.view("main", { title: "Welcome to Country" });
        },
    },
    showSignup: {
        auth: false,
        handler: function (request, h) {
            return h.view("signup-view", { title: "Sign up for Country" });
        },
    },
    signup: {
        auth: false,
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const user = request.payload;
            user.email = validator.normalizeEmail(user.email);
            user.password = await bcrypt.hash(user.password, saltRounds);
            await db.userStore.addUser(user);
            return h.redirect("/");
        },
    },
    showLogin: {
        auth: false,
        handler: function (request, h) {
            return h.view("login-view", { title: "Login to Country" });
        },
    },
    login: {
        auth: false,
        validate: {
            payload: UserCredentialsSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const sanitizedEmail = validator.normalizeEmail(email);
            const user = await db.userStore.getUserByEmail(sanitizedEmail);
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (!user || !passwordsMatch) {
                return h.redirect("/");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        },
    },
    logout: {
        handler: function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },

    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return { valid: false };
        }
        return { valid: true, credentials: user };
    },
};
