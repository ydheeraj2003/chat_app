const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            maxlength: 20
        },
        email:{
            type: String,
            required: true,
            maxlength: 30,
            unique: true
        },
        password:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

const userModel=mongoose.model("User", userSchema);
module.exports=userModel;