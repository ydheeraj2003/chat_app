const userModel=require("../Models/userModel");
const bcrypt=require("bcrypt");
const validator=require("validator");
const jwt=require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey=process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registerUser = async (req,res) => {

    try {
        const {name, email, password} = req.body;

        let user=await userModel.findOne({email});
        if (user) return res.status(400).json("user with this email already exists");
        if (!name || !email || !password) return res.status(400).json("all fields are mandatory to fill");
        if (!validator.isEmail(email)) return res.status(400).json("email must be valid");
        if (!validator.isStrongPassword(password)) return res.status(400).json("password must be strong");

        user=new userModel(
            {
                name,
                email,
                password
            }
        )
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password, salt);
        await user.save();
        const token=createToken(user._id);
        return res.status(200).json({_id: user._id, name, email, token});
    }
    catch(error){
        return res.status(500).json(error);
    }
    
}

const loginUser = async(req,res) => {
    try{
        const {email,password}=req.body;
        let user=await userModel.findOne({email});
        if (!user) return res.status(400).json("email doesn't exist");
        const isValidPassword=await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json("password is incorrect");
        const token=createToken(user._id);
        return res.status(200).json({_id: user._id, name: user.name, email, token});

    }
    catch(error){
        return res.status(500).json(error);
    }
}

const findUser = async(req,res) => {
    const userId=req.params.userId;
    try{
        const user=await userModel.findById(userId);
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

const getUsers = async(req,res) => {
    try{
        const users=await userModel.find();
        return res.status(200).json(users);
    }
    catch(error){
        return res.status(500).json(error);
    }
}

module.exports= {registerUser, loginUser, findUser, getUsers};