 const asyncHandler=require("express-async-handler")
 const User=require("../models/userModel")
 const bcrypt = require('bcrypt')
 const jwt=require("jsonwebtoken")



//@desc Register User 
//@route GET/api/users/register
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const {username ,email,password}=req.body;


  if(!username||!email||!password){
    res.status(400);
    throw new Error("All fields are mandatory");

  }

   const  userAvailable= await User.findOne({email});
   if(userAvailable){
    res.status(400);
    throw new Error("User already registered! ");

   }
   const hashPassword=await bcrypt.hash(password,10);
   console.log("Hashed Password: ",hashPassword);
    
   const user=await User.create({
    username,
    email,
    password:hashPassword,
   })

   console.log(`User Created ${user}`);
   if(user){

    res.status(201).json({ _id:user.id,   email:user.email,  });

}else{

    res.status(400);
    throw new Error("User data is not valid ");
}
     res.status(200).json({
        message:"Register the user"
      });

   
});

//@desc Login User 
//@route GET/api/users/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
    const {email ,password}=req.body;


  if(!email||!password){
    res.status(400);
    throw new Error("All fields are mandatory");

  }

   const  user= await User.findOne({email});
    

   if(user && (await bcrypt.compare(password,user.password))){
    const accessToken=jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
        }
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1m"}
    );

    
    res.status(200).json({accessToken});
   }else{
    res.status(401);
    throw new Error("email or password is not valid ");


   }


    res.status(200).json({
        message:"Login User"
    })

});


//@desc Current User 
//@route GET/api/users/current
//@access private

const currentUser = asyncHandler(async (req,res)=>{

    res.status(200).json({
        message:"Current User Information"
    })

});



module.exports={registerUser,loginUser,currentUser}