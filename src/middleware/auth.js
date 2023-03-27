const jwt = require("jsonwebtoken");

const Register = require("../model/register")

const auth = async(req,res,next)=>{
    try {
        const getcooies = req.cookies.jwt
console.log( "this is my get Cookies" +getcooies)

    const verifycookies = await jwt.verify(getcooies,"mynameisramveer")
    next()
    } catch (error) {
        console.log(error)
        res.render("login",{please_login_first:"Please Login First"})
    }

}

module.exports = auth;