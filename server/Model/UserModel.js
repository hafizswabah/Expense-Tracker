import Mongoose from "mongoose";
const UserSchema=new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    block:{
        type:Boolean,
        default:false
    },
    MonthlyExpense:{
        type:Number,
        default:0
    }
})
const UserModel=Mongoose.model("Users",UserSchema)
export default UserModel