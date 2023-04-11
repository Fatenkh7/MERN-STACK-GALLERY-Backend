import inboxModel from "../models/Inbox.js";

export async function post(req, res, next) {
  const inbox = await inboxModel(req.body);
  try {
    inbox.save();
    const savedInbox = inbox;
    return res.status(200).json({ data: savedInbox });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
}
export const getAll = async (req, res) => {
  inboxModel.find({}, (err, message) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(200).json({ data: message });
    }
  });
};

//delete inbox by id
export const deleteInbox = async (req, res) => {
  try {
    const removeInbox = await inboxModel.findOneAndDelete({
      _id: req.params.id,
    });
    res
      .status(200)
      .json({ data: removeInbox, message: "This inbox has been deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

//delete inbox by email
export const deleteInboxEmail = async (req, res) => {
  try {
    const removeInbox = await inboxModel.findOneAndDelete({
      email: req.params.email,
    });
    res
      .status(200)
      .json({ data: removeInbox, message: "This inbox has been deleted" });
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const getByEmail = async (req, res, next) => {
  const { email } = req.params;
  inboxModel.find({ email: email }, (err, response) => {
    if (err) return next(err);
    return res.status(200).json({ success: true, Mail: response });
  });
};
const controller = { getAll, post, deleteInboxEmail, deleteInbox, getByEmail };
export default controller;
