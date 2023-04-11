import postersModel from "./../models/Poster.js";
import fs from "fs";

//get all the Posters
export async function getAll(req, res, next) {
  postersModel.find({}, (err, response) => {
    if (err) return next(err);
    return res.status(200).send({ success: true, response });
  });
}

// //get posters by id
// export async function getByID(req, res, next) {
//   let { id } = req.params;
//   const poster = await postersModel.findById(id);
//   try {
//     res.status(200).json({ data: poster });
//   } catch (err) {
//     res.status(404).json({ message: err });
//   }
// }

//get posters by type=category
export async function getByTitle(req, res, next) {
  try {
    let title = req.params.title.toLowerCase().trim();
    const response = await postersModel.find({ title });
    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Poster not found." });
    }
    res.status(200).send({ success: true, response });
  } catch (error) {
    next(error);
  }
}

//create a poster
export async function post(req, res, next) {
  try {
    const newPoster = new postersModel({
      image: req.imagePath,
      description: req.body.description,
      position: req.body.position,
      title: req.body.title,
    });
    await newPoster.save((err, response) => {
      if (err) return next(err);
      res.send({
        status: 200,
        message: "poster saved successfuly",
        response,
      });
    });
  } catch (err) {
    return res.status(403).send({ status: 403, err });
  }
}

//update the poster
export async function put(req, res, next) {
  try {
    let filter = { _id: req.params.id };
    let update = {
      image: req.body.imagePath,
      description: req.body.description,
      position: req.body.position,
      title: req.body.title,
    };
    const poster = await postersModel.findById(req.params.id);
    if (!poster) {
      return res.status(404).send({ status: 404, message: "Not Found" });
    }
    if (req.body.imagePath) {
      fs.unlinkSync(poster.image);
    }
    const updatedPoster = await postersModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({ data: updatedPoster });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

//delete the poster
export async function deletePoster(req, res, next) {
  let { id } = req.params;
  postersModel
    .findOneAndDelete({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Not Found" });
      } else {
        fs.unlinkSync(response.image);
        res.status(200).send({ status: 200, message: "Deleted successfully" });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}

const controller = { post, getAll, deletePoster, getByTitle, put };
export default controller;
