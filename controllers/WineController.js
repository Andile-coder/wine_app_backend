const Wine = require("../models/WineModel");

// @desc create wine
// @route POST /wine
// @access private

const createWine = async (req, res) => {
  const { name, year, type, rating, consumed, date_consumed, varietal } =
    req.body;
  const { user_id } = req.user;
  if (
    !name ||
    !year ||
    !type ||
    !rating ||
    !user_id ||
    !varietal
  ) {
    res.status(400).send({ message: "Missing Values" });
    return;
  }
  Wine.create({
    name,
    year,
    type,
    rating,
    consumed,
    date_consumed,
    user_id,
    varietal,
  })
    .then((wine) => {
      res.status(201).json({ message: "wine created succesfully " });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create wine " + error });
    });
};

//  get user wines
const getUserWines = async (req, res) => {
  const { user_id } = req.user;
  const page = req.query.page;
  await Wine.findAll({  limit: 20, offset: page?page:1 * 10})
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get wines", error });
      return;
    });
};
// get wine
const getWine = async (req, res) => {
  const { wine_id } = req.params;
  await Wine.findOne({ where: { wine_id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get wine", error });
      return;
    });
};
//update wine
const updateWine = async (req, res) => {
  const { wine_id } = req.params;
  const { name, year, type, rating, consumed, date_consumed } = req.body;
  await Wine.update(
    { name, year, type, rating, consumed, date_consumed },
    { where: { wine_id } }
  )
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to update wine", error });
      return;
    });
};
// delete wine
const deleteWine = async (req, res) => {
  const { wine_id } = req.params;
  await Wine.destroy({ where: { wine_id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to delete wine", error });
      return;
    });
};
module.exports = { createWine, getUserWines, updateWine, deleteWine, getWine };
