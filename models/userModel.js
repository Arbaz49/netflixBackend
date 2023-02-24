import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"password must be at least 6 characters"],
       
    },
    phoneNo:{
        type:Number,
    },
    bio:{
        type:String,
        minLength:[6,"enter atleast 6 character"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next();
})

//
userSchema.methods.verifyPassword=async function(userPassword,encryptedPassword){
    return await bcrypt.compare(userPassword,encryptedPassword);
}

const UserModel= new mongoose.model("User",userSchema);
export default UserModel;