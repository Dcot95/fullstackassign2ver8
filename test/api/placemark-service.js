import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
    placemarkUrl: serviceUrl,

    async createUser(user) {
        const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
        return res.data;
    },

    async getAllUsers() {
        const res = await axios.get(`${this.placemarkUrl}/api/users`);
        return res.data;
    },

    async deleteAllUsers() {
        const res = await axios.delete(`${this.placemarkUrl}/api/users`);
        return res.data;
    },

    async createCountry(country) {
        const res = await axios.post(`${this.placemarkUrl}/api/countrys`, country);
        return res.data;
    },

    async deleteAllCountrys() {
        const response = await axios.delete(`${this.placemarkUrl}/api/countrys`);
        return response.data;
    },

    async deleteCountry(id) {
        const response = await axios.delete(`${this.placemarkUrl}/api/countrys/${id}`);
        return response;
    },

    async getAllCountrys() {
        const res = await axios.get(`${this.placemarkUrl}/api/countrys`);
        return res.data;
    },

    async getCountry(id) {
        const res = await axios.get(`${this.placemarkUrl}/api/countrys/${id}`);
        return res.data;
    },

    async getAllPointofinterests() {
        const res = await axios.get(`${this.placemarkUrl}/api/pointofinterests`);
        return res.data;
    },

    async createPointofinterest(id, pointofinterest) {
        const res = await axios.post(`${this.placemarkUrl}/api/countrys/${id}/pointofinterests`, pointofinterest);
        return res.data;
    },

    async deleteAllPointofinterests() {
        const res = await axios.delete(`${this.placemarkUrl}/api/pointofinterests`);
        return res.data;
    },

    async getPointofinterest(id) {
        const res = await axios.get(`${this.placemarkUrl}/api/pointofinterests/${id}`);
        return res.data;
    },

    async deletePointofinterest(id) {
        const res = await axios.delete(`${this.placemarkUrl}/api/pointofinterests/${id}`);
        return res.data;
    },

    async getAllReviews() {
        const res = await axios.get(`${this.placemarkUrl}/api/reviews`);
        return res.data;
    },

    async createReview(id, review) {
        const res = await axios.post(`${this.placemarkUrl}/api/countrys/${id}/reviews`, review);
        return res.data;
    },

    async deleteAllReviews() {
        const res = await axios.delete(`${this.placemarkUrl}/api/reviews`);
        return res.data;
    },

    async getReview(id) {
        const res = await axios.get(`${this.placemarkUrl}/api/reviews/${id}`);
        return res.data;
    },

    async deleteReview(id) {
        const res = await axios.delete(`${this.placemarkUrl}/api/reviews/${id}`);
        return res.data;
    },

    async authenticate(user) {
        const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        return response.data;
    },

    async clearAuth() {
        axios.defaults.headers.common["Authorization"] = "";
    },
};

