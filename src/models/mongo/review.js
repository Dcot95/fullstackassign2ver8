import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    title: String,
    comment: String,
    rating: Number,
    countryid: {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);
