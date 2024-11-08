import {v2 as cloudinary} from "cloudinary"
import bannerModel from "../models/bannerSchema.js";

//addBanner
const addBanner = async (req, res) => {
  try {
    const { name } = req.body;
    const image1 =req.files.image1 && req.files.image1[0];
    const image2 =req.files.image2 && req.files.image2[0];
    const image3 =req.files.image3 && req.files.image3[0];
    const image4 =req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
        (item) => item !== undefined
      );
  
      const imagesUrl=await Promise.all(
          images.map(async(item)=>{
              let result=await cloudinary.uploader.upload(item.path,{resource_type:"image"})
          return result.secure_url
          })
      )
      const bannerData={
        name,
        image:imagesUrl,
        date:Date.now(),
      }
      const banner= new bannerModel(bannerData)
      await banner.save()
      res.json({success:true, message:"Banner added successfully", banner})
     
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//ListBanner
const listBanner = async (req, res) => {
    try {
        const listBanner= await bannerModel.find({});
        res.json({success:true,message:" This is Banner list ", listBanner})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//removeBanner
const removeBanner = async (req, res) => {
    try {
        await bannerModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Banner removed "})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addBanner, listBanner, removeBanner };
