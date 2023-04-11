import InformationsModel from "../models/Informations.js";

export async function getInfo(req, res) {
  InformationsModel.find({}, (err, message) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(200).json({ data: message });
    }
  });
}

export async function setInfo(req, res) {
  try {
    let update = req.body;
    const updateInformation = await InformationsModel.findByIdAndUpdate({ _id: req.params.id },
      update,
      {
        //for save it in the database
        new: true,
      }
    )
    res.status(200).json({ data: updateInformation });
  } catch (err) { 
    res.status(404).json({ message: err });
  }
}



const controller = { getInfo, setInfo };
export default controller;
