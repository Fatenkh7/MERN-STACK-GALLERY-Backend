import categoriesModel from "./../models/Categories.js";

export async function post(req, res, next) {
  const category = await categoriesModel(req.body);
  try {
    category.save();
    const savedCategory = category;
    return res.status(200).json({ data: savedCategory });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
}
export async function getAll(req, res, next) {
  categoriesModel.find({}, (err, response) => {
    if (err) return next(err);
    return res.status(200).send({ success: true, response });
  });
}

export async function getByCatName(req, res, next) {
  let { CATEGORY } = req.params;
  categoriesModel.findOne({ category: CATEGORY }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
}

export async function editCategory(req, res, next) {
  try {
    let filter = { category: req.params.CATEGORY };
    let update = req.body;
    const updateCategory = await categoriesModel.findOneAndUpdate(
      filter,
      update,
      {
        //for save it in the database
        new: true,
      }
    );
    res.status(200).json({ data: updateCategory });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}
export async function deleteCategory(req, res) {
  try {
    const removeCategory = await categoriesModel.findOneAndDelete({
      category: req.params.CATEGORY,
    });
    res
      .status(200)
      .json({ data: removeCategory, message: "This category has been deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
}

const controller = { getAll, post, editCategory, getByCatName, deleteCategory };
export default controller;
