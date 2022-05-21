const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//I got sick of writting this entire thing out. So i tried to make a function that can simplify my code.
// Unfortunately I got lots of errors. i will save this for antoher day.
//const mongoCollection = async(req,res,next) => {
//   const mongoCollection = await mongodb.getDb().db(process.env.PARENT_FOLDER).collection(process.env.CHILD_FOLDER);
// };

const getAll = async (req, res, next) => {
  /*
    #swagger.description =  Get all contacts in the database
  */
  try {
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.CHILD_FOLDER)
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingle = async (req, res, next) => {
  /*
    #swagger.description =  Get a single contact based on the ID
    */
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.CHILD_FOLDER)
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const postNewContact = async (req, res) => {
  /*
    #swagger.description =  Create a new contact
  */
  try {
    const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      favoriteSport: req.body.favoriteSport,
      favoriteFood: req.body.favoriteFood,
      favoriteQuote: req.body.favoriteQuote,
    };
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.CHILD_FOLDER)
      .insertOne(newContact);
    //error response was inserted from the instructors code.
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error has occured');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//logic of the update was mirrored from the getSingle(since all we want is to find someone based on their ID).
const putUpdateContact = async (req, res) => {
  /*
    #swagger.description =  Update a contact
  */
  try {
    const userId = new ObjectId(req.params.id);
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      favoriteSport: req.body.favoriteSport,
      favoriteFood: req.body.favoriteFood,
      favoriteQuote: req.body.favoriteQuote,
    };

    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.CHILD_FOLDER)
      .replaceOne({ _id: userId }, updatedContact);

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

//logic and const used from single and update
const deleteContact = async (req, res) => {
  /*
    #swagger.description =  Delete a contact
  */
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db(process.env.PARENT_FOLDER)
      .collection(process.env.CHILD_FOLDER)
      .deleteOne({ _id: userId });

    //error response was inserted from the instructors code.
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
  postNewContact,
  putUpdateContact,
  deleteContact,
};
