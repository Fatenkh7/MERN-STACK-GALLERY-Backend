import jwt from "jsonwebtoken";

const  auth = (req, res, next) => {
let token
token = req.cookies['token-auth'] ||req.headers["auth_token"]
if(!token){
return res.status(401).send("Access Denied")
}
try{
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    req.admin = decoded;
    next();
}
catch(err){
    return res.status(400).send("Access Denied"+err.message)
}

};

export default auth

