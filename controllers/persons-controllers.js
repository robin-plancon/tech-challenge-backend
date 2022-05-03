const { validationResult } = require("express-validator");
const Person = require("../models/person");

const getPersons = async (req, res, next) => {
  let persons;
  try {
    persons = await Person.find({});
  } catch (err) {
    return res.status(404).json({error: {message:"Fetching persons failed, please try again later."}});
    // throw new Error("Fetching persons failed, please try again later.");
  }
  res.json({
    persons: persons.map((person) => person.toObject({ getters: true })),
  });
};

const addPerson = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        error: { message: "Invalid inputs passed, please check your data" },
      });
  }

  const { name } = req.body;

  const createdPerson = new Person({
    name,
  });

  try {
    await createdPerson.save();
  } catch (err) {
    return res
      .status(500)
      .json({
        error: { message: "Creating person failed, please try again" },
      });
  }

  res.status(201).json({ name: createdPerson.name, id: createdPerson.id });
};

exports.getPersons = getPersons;
exports.addPerson = addPerson;
