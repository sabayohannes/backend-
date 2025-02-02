import validator from "validator"
import bcrypt from "bcrypt"
import { json } from "express";
import doctorsModel from "../models/doctorsModel.js"

const addDoctor=async(req,res)=>{
    try{

const{name,email,password,speciality,degree,experiance,about,available,fee,address} =req.body;
 
const imagefile=req.file
if(!name|| !email|| !password|| !speciality|| !degree|| !experiance|| !about|| !available|| !fee|| !address){

  return res.json({success:false,message:"missing detail"})
}

if(!validator.isEmail(email)){
  return res.json({success:false,message:" please enter valid email"})
}
if(password.length <8){
  return res.json({success:false,message:"please enter strong password"})
}

const salt=await bcrypt.genSalt(10)
const hashPassword=await bcrypt.hash(password,salt)

const imageUpload= await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"})
const imageUrl=imageUpload.secure_url
const doctorData={
  name,
  email,
  image:imageUrl,
  password:hashPassword,
  speciality,
  degree,
  experiance,
  about,
  fee,
  address:json.parse(address),
  date:Date.now()

  }
  
  const newDoctor=new doctorsModel(doctorData)
  newDoctor.save();
  return res.json({success:true,message:"New doctor is successfully added"})
 } catch(error){
console.log(error)
res.json({success:false,message:error.message})
    }
}


export {addDoctor}