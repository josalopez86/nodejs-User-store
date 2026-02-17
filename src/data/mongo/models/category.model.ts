

import mongoose, { Schema, Types } from "mongoose";

export interface Category {
  _id: Types.ObjectId;
  name: string;
  available: boolean;
  User: Types.ObjectId;
}

//const categorySchema = new mongoose.Schema<Category>({
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required."],     
        unique: true,   
    },
    available:{
        type:Boolean,
        default: true
    },
    User:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
        }
});

export const CategoryModel = mongoose.model("Category", categorySchema);
