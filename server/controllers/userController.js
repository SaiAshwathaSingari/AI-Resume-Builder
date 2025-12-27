import User from "../models/User.js"
import bycrpt from "bcrypt";

import jwt from "jsonwebtoken"

//Function for token generation

const generateToken = (userId)=>{
  const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn: '7d'});
  return token;
}
// User Register Function
export const registerUser = async(req,res)=>{
    
    try {
      const {name,email,password} = req.body

      if(!name || !email || !password){
      return res.status(400).json({message:"Error, all fields are not filled"})
    }

    const user = await User.findOne({email})
    if(user){
      return res.status(401).json({message:"User already Exsists!"})
    }

    const HashedPassword = await bycrpt.hash(password,10)
    const newUser = await User.create({
      name,email,password:HashedPassword
    })
    
    const token = generateToken(newUser._id);
    newUser.password = undefined

    return res.status(201).json({
  message: "User created successfully!",
  token,
  user: newUser
});


    } catch (error) {
      console.log(error)
      return res.status(400).json({message:"404-Error"});
    }
    



}


//Function to Login

export const Login = async(req,res)=>{
 
  try {
     const {email,password} = req.body 
    if(!email || !password){
      return res.status(400).json({message: "Error"})
    }

    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({message: "No User found! Register"})
    }

    if(!user.comparePassword(password)){
      return res.status(400).json({message: "Inavlid Email or Password"})
    }

    const token = generateToken(user._id);

   return res.status(200).json({
  message: "Login Successful!",
  token,
  user
});


  } catch (error) { 

    return res.status(400).json({mesage: "Error"})
    
  }
}


//Function to get User Data

export const getUserById = async(req,res)=>{
  try {
    const userId = req.userId

    const user = await User.findById(userId)
    if(!user){
      return res.status(400).json({message: "User does not Exsist"})
    }
    user.password = undefined;

    return res.status(200).json({message: "User found",
      user

    });
  } catch (error) {
    return res.status(400).json({message: "Error"})
  }
}