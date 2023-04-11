import adminModel from "./../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const config = process.env;

//get all the Admins
export async function getAll(req, res, next) {
  adminModel.find({}, (err, response) => {
    if (err) return next(err);
    return res.status(200).send({ success: true, response });
  });
}

//get the Admins by id
export async function getByID(req, res, next) {
  let { id } = req.params;
  adminModel.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

//create a admin
export async function post(req, res,next) {
  try {
    // Get admin input
    const { firstname, lastname, username, email, password } = req.body;

    // Validate admin input
    if (!(email && password && firstname && lastname && username)) {
     return res.status(400).send("All input is required");
    }

    // check if the admin already exist
    // Validate if user exist in our database
    const valUsername = await adminModel.findOne({ username });
    if (valUsername) {
		console.log("test")
      return res
        .status(409)
        .send("Please change the username because already exist");
    }
    const oldAdmin = await adminModel.findOne({ email });

    if (oldAdmin) {
      
		console.log("test1")
	return	res.status(409).send("Admin Already Exist. Please Login");
    }

    //Encrypt admin password
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    // Create a new admin in our database
    const newAdmin = new adminModel({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email.toLowerCase(), // sanitize
      password: hash,
    });
    await newAdmin.save((err, response) => {
      if (err){
		console.log("test2")
		next(err);}
    });
    const theId = { _id: newAdmin._id };
    const token = jwt.sign(theId, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });
    newAdmin.token = token;
	console.log("test3")
    res.cookie("token-auth", token, { maxAge: 900000, httpOnly: true });
    res.status(201).json(newAdmin);
  } catch (err) {
	console.log("test4")
    return res.status(403).send({ status: 403, err });
  }
}

//Update the admin
export async function put(req, res) {
  try {
    let filter = { username: req.params.USERNAME };
    let update = req.body;
    
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password, salt);
    update.password= hash
    const updateAdmin = await adminModel.findOneAndUpdate(filter, update, {
      //for save it in the database
      new: true,
    });
    res.status(200).json({ data: updateAdmin });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

//Delete an admin
export async function deleteAdmin(req, res, next) {
  try {
    const removeAdmin = await adminModel.findOneAndDelete({
      username: req.params.USERNAME,
    });
    res
      .status(200)
      .json({ data: removeAdmin, message: "This admin has been deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

const controller = { post, getAll, deleteAdmin, getByID, put };
export default controller;
