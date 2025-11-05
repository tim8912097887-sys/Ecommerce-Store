import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2,"Name at least two characters"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0.1,"Price should not lower than one cent"]
    },
    image: {
        type: String,
        required: [true,"Image is required"]
    },
    category: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export const ProductModel = mongoose.model("products",productSchema);