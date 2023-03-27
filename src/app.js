const express = require ("express");
const path = require("path");
const hbs = require('hbs');
const  app = express();
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcryptjs")

const port = 3000;
require("./database/dbconn");
const Register = require("./model/register")
const auth = require("./middleware/auth")


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())

// use public file 
app.use(express.static("public"));

const dynamic_path = path.join(__dirname,"../template/views")
app.set("view engine","hbs");
app.set("views",dynamic_path)


// use partials file 

const partials_path = path.join(__dirname,"../template/partials");
hbs.registerPartials(partials_path);







app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/private",auth,(req,res)=>{
    res.render("private")
})
app.get("/logout",auth,(req,res)=>{
    res.clearCookie("jwt")
    res.render("home")
})
app.get("/about",(req,res)=>{
    res.render("about")
})


app.post("/register", async(req,res)=>{
try {
   const password = req.body.password;
   const cpassword = req.body.cpassword;
    if(password===cpassword){
        const userData = new Register({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            cpassword:cpassword
        })
        console.log(userData)
        const savedata = await userData.save();
        res.render("home");
    }else{
        res.render("register",{pass_not_matching:"Password are not matching"})
    }

} catch (error) {
    console.log(error)
    res.send(error)
}

})


app.post("/login", async (req,res)=>{
    try {
        const email= req.body.email;
        const password = req.body.password;
        const  useremail = await Register.findOne({email:email});

            const generatToken = jwt.sign({_id:useremail},"mynameisramveer")
            console.log(generatToken)

            res.cookie("jwt",generatToken,{expires:new Date(Date.now() + 60000),
            httpOnly:true
            })
            const compare = await bcrypt.compare(password,useremail.password)
        if(compare){
            res.render("home");
        }else{
            
            res.render("login",{invalid_login_Detail:"Invalid Login Detail"})
        }

        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


app.listen(port,()=>{
    console.log(`The server is running port no ${port}`);
})