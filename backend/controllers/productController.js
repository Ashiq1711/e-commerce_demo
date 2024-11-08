import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js";
//addProduct
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
  
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl=await Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:"image"})
        return result.secure_url
        })
    )

    const productData= {
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:bestseller==="true"  ? true : false,
        sizes: JSON.parse(sizes),
        image:imagesUrl,
        date:Date.now(),
    }
   const product= new productModel(productData)
   await product.save()
   res.json({success:true, message:"Product added successfully"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//lisrProduct
const listProduct = async (req, res) => {
    try {
        const listProduct= await productModel.find({});
        res.json({success:true,message:" This is Product list ", listProduct})
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};
//removeProduct
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product removed "})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }
};
//singleProduct
const singleProduct = async (req, res) => {
  try {
    const {productId}=req.body
    const singleProduct=await productModel.findById(productId)
    res.json({success:true,message:"Single Product ",singleProduct})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
