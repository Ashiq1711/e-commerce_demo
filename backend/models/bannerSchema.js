import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  name:{type:String},
  image: { type: Array, required: true },
  date: { type: Number, required: true },
});

const bannerModel =
  mongoose.models.banner || mongoose.model("banner", bannerSchema);
export default bannerModel;
