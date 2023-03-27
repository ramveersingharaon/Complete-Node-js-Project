const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
});

userSchema.pre("save", async function(next){
this.password= await bcrypt.hash(this.password,10)
this.cpassword= await bcrypt.hash(this.cpassword,10)


    next();
})



const Register = new mongoose.model("register",userSchema);

module.exports = Register;