const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  /*
    #swagger.description =  Get all metal price entries in the database
    #swagger.tags = ['Metal']
  */
  try {
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.METAL_PRICE)
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
    #swagger.description =  Get a single metal price entry based on the ID
    #swagger.tags = ['Metal']
    */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.METAL_PRICE)
      .find({ _id: userId })
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

// const postNewMetal = async (req, res) => {
//   /*
//     #swagger.description =  Create a new Metal entry
//   */
//   try {
//     const newMetal = {
//       metal_name: req.body.metal_name,
//       metal_price: req.body.metal_price,
//       metal_transaction_modifier: req.body.metal_transaction_modifier,      
//     };
//     const response = await mongodb
//       .getDb()
//       .db(process.env.PARENT_FOLDER)
//       .collection(process.env.METAL_PRICE)
//       .insertOne(newMetal);
//     //error response was inserted from the instructors code.
//     if (response.acknowledged) {
//       res.status(201).json(response);
//     } else {
//       res.status(500).json(response.error || 'An error has occured');
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

//logic of the update was mirrored from the getSingle(since all we want is to find someone based on their ID).
const putUpdateMetal = async (req, res) => {
  /*
    #swagger.description =  Update a Metal Entry
    #swagger.tags = ['Metal']
  */
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('User ID is not a valid Mongo ID');
    }
    const userId = new ObjectId(req.params.id);
    const updatedMetal = {
        metal_name: req.body.metal_name,
        metal_price: req.body.metal_price,
        metal_transaction_modifier: req.body.metal_transaction_modifier,  
    };

    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.METAL_PRICE)
      .replaceOne({ _id: userId }, updatedMetal);

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

// const deleteMetal = async (req, res) => {
//   /*
//     #swagger.description =  Delete a Metal
//   */
//   try {
//     const userId = new ObjectId(req.params.id);
//     const response = await mongodb
//       .getDb()
//       .db(process.env.PARENT_FOLDER)
//       .collection(process.env.METAL_PRICE)
//       .deleteOne({ _id: userId });

//     //error response was inserted from the instructors code.
//     if (response.acknowledged) {
//       res.status(201).json(response);
//     } else {
//       res.status(500).json(response.error || 'An error has occured');
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };


module.exports = {
  getAll,
  getSingle,
  //postNewMetal,
  putUpdateMetal,
  //deleteMetal,
};
