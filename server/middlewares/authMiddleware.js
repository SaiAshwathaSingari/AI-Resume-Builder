import jwt from "jsonwebtoken";


const protect = async(req,res,next)=>{

  const token = req.headers.authorization;

  if(!token){
    return res.satus(401).json({message: "Unauthorized"})


  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId
    next();
  } catch (error) {
    return res.satus(404).json({message: "Error"})
  }
}

export default protect;