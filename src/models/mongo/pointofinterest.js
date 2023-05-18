import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pointofinterestSchema = new Schema({
    title: String,
    county: String,
    description: String,
    latitude: Number,
    longitude: Number,
    countryid: {
        type: Schema.Types.ObjectId,
        ref: "Country",
    },
});

export const Pointofinterest = Mongoose.model("Pointofinterest", pointofinterestSchema);
