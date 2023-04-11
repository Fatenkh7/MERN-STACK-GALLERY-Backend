import reviewModel from "../models/Reviews.js";

//Get All reviews
export async function getAll(req, res, next) {
  reviewModel.find({}, (err, response) => {
    if (err) return next(err);
    return res.status(200).send({ success: true, response });
  });
}

//Add a new review
export async function addReview(req, res, next) {
  try {
    const newReview = new reviewModel({
      username: req.body.username,
      comment: req.body.comment,
    });
    await newReview.save((err, response) => {
      if (err) return next(err);
      res.send({
        status: 200,
        message: "review successfuly added",
        response,
      });
    });
  } catch (err) {
    return res.status(403).send({ status: 403, err });
  }
}

// Update a review
export async function editRedview(req, res, next) {
  try {
    reviewModel.updateOne({ username: req.params.username }, req.body);
    res.json({ status: 200, message: "review updated" });
  } catch (err) {
    res.json({ status: 400, message: err });
  }
}

// Delete a review
export async function deleteReview(req, res, next) {
  let {USERNAME}=req.params
  try {
    reviewModel.findOneAndDelete({ username: req.params.USERNAME }, req.body);
    res.json({ status: 200, message: "review deleted" });
  } catch (err) {
    res.json({ status: 400, message: err });
  }
}
const controller = { getAll, addReview, editRedview, deleteReview };
export default controller;
