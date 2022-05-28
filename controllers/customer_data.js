const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /*
    #swagger.description =  Get all customers in the database
    #swagger.tags = ['Customer']
  */
  try {
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.PROJECT_DETAILS)
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res, next) => {
  /*
    #swagger.description =  Get a single customer based on the ID
    #swagger.tags = ['Customer']
    */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.PROJECT_DETAILS)
      .find({ _id: userId });
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const postNewCustomer = async (req, res) => {
  /*
    #swagger.description =  Create a new customer
    #swagger.tags = ['Customer']
  */
  try {
    const newCustomer = {
      client_name: req.body.client_name,
      finger_size: req.body.finger_size,
      current_date: req.body.current_date,
      project_volume: req.body.project_volume,
      s_08_12mm: req.body.s_08_12mm,
      s_13_17mm: req.body.s_13_17mm,
      s_18_26mm: req.body.s_18_26mm,
      s_27_32mm: req.body.s_27_32mm,
      s_33_35mm: req.body.s_33_35mm,
      s_36_38mm: req.body.s_36_38mm,
      s_39_41mm: req.body.s_39_41mm,
      other_stone_1: req.body.other_stone_1,
      other_stone_2: req.body.other_stone_2,
      parts_1: req.body.parts_1,
      parts_2: req.body.parts_2,
      prong_set_standard: req.body.prong_set_standard,
      prong_set_fancy: req.body.prong_set_fancy,
      channel_set_standard: req.body.channel_set_standard,
      channel_set_fancy: req.body.channel_set_fancy,
      bezel_flush_standard: req.body.bezel_flush_standard,
      bezel_flush_fancy: req.body.bezel_flush_fancy,
      plating: req.body.plating,
      solder: req.body.solder,
      laser: req.body.laser,
      texture: req.body.texture,
      center_stone_settting_RETAIL: req.body.center_stone_settting_RETAIL,
      other_labor_RETAIL: req.body.other_labor_RETAIL,
      casting: req.body.casting,
      CAD_modifier: req.body.CAD_modifier,
      
    };
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.PROJECT_DETAILS)
      .insertOne(newCustomer);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const putUpdateCustomer = async (req, res) => {
  /*
    #swagger.description =  Update a customer
    #swagger.tags = ['Customer']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const updatedCustomer = {
      client_name: req.body.client_name,
      finger_size: req.body.finger_size,
      current_date: req.body.current_date,
      project_volume: req.body.project_volume,
      s_08_12mm: req.body.s_08_12mm,
      s_13_17mm: req.body.s_13_17mm,
      s_18_26mm: req.body.s_18_26mm,
      s_27_32mm: req.body.s_27_32mm,
      s_33_35mm: req.body.s_33_35mm,
      s_36_38mm: req.body.s_36_38mm,
      s_39_41mm: req.body.s_39_41mm,
      other_stone_1: req.body.other_stone_1,
      other_stone_2: req.body.other_stone_2,
      parts_1: req.body.parts_1,
      parts_2: req.body.parts_2,
      prong_set_standard: req.body.prong_set_standard,
      prong_set_fancy: req.body.prong_set_fancy,
      channel_set_standard: req.body.channel_set_standard,
      channel_set_fancy: req.body.channel_set_fancy,
      bezel_flush_standard: req.body.bezel_flush_standard,
      bezel_flush_fancy: req.body.bezel_flush_fancy,
      plating: req.body.plating,
      solder: req.body.solder,
      laser: req.body.laser,
      texture: req.body.texture,
      center_stone_settting_RETAIL: req.body.center_stone_settting_RETAIL,
      other_labor_RETAIL: req.body.other_labor_RETAIL,
      casting: req.body.casting,
      CAD_modifier: req.body.CAD_modifier,
    };

    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.PROJECT_DETAILS)
      .replaceOne({ _id: userId }, updatedCustomer);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || 'Some error occurred while updating the contact.'
        );
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCustomer = async (req, res) => {
  /*
    #swagger.description =  Delete a customer
    #swagger.tags = ['Customer']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.PROJECT_DETAILS)
      .deleteOne({ _id: userId });

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  postNewCustomer,
  putUpdateCustomer,
  deleteCustomer,
};
