const res = require('express/lib/response');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    mongodb
        .getDB()
        .db()
        .collection('recipe')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({ message: err })
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
    });
        
};

const getSingle = async (req,res,next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid recipe id")
    }
    const recipeId = new ObjectId(req.params.id);
    mongodb
    .getDB()
    .db()
    .collection('recipe')
    .find({ _id: recipeId })
    .toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};


const addOne = async (req,res,next) => {
    const contact = {
        name: req.body.name,
        hour: req.body.hour,
        minute: req.body.minute,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        image: req.body.image,
        authorName: req.body.authorName
    
    }
    const result = await mongodb
    .getDB()
    .db()
    .collection('recipe')
    .insertOne(contact);
    if (result.acknowledged){
        res.status(201).json(result)
    } else {
        res.status(500).json(result.error || 'an error occured');
    }
};

const editOne = async (req,res,next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid recipe id")
    }
    const recipeId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        hour: req.body.hour,
        minute: req.body.minute,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        image: req.body.image,
        authorName: req.body.authorName
    }
    const result = await mongodb
    .getDB()
    .db()
    .collection('recipe')
    .replaceOne(
        
        { _id: recipeId },
        contact
        
        );
        if (result.modifiedCount > 0){
            res.status(204).json(result)
        } else {
            res.status(500).json(result.error || 'an error occured');
        }
};



const deleteOne = async (req,res,next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must use a valid recipe id")
    }
    const recipeId = new ObjectId(req.params.id);
    
    const result = await mongodb
    .getDB()
    .db()
    .collection('recipe')
    .deleteOne(
        
        { _id: recipeId },
        
        );
        if (result.deletedCount > 0){
            res.status(204).json(result)
        } else {
            res.status(500).json(result.error || 'an error occured');
        }
};





const getRecipes = async (req,res,next) => {
    // if (!ObjectId.isValid(req.params.id)) {
    //     res.status(400).json("Must use a valid recipe id")
    // }
    const first = (req.params.word1);
    const second = (req.params.word2);
    // const third = (req.params.word3);


    console.log("hello world")
    console.log(first)
    console.log(second)
    // console.log(third)


    mongodb
    .getDB()
    .db()
    .collection('recipe')
    // .find({ name: /mac/i  })
    .find({ "ingredients.name": { $all: [RegExp(first, 'i'),  RegExp(second, 'i')]  }})
    // .find({ "ingredients.name": { $all: [RegExp(first, 'i'),  RegExp(second, 'i'), RegExp(third, 'i')]  }})
    .toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};



module.exports = { getAll, getSingle, addOne, editOne, deleteOne, getRecipes}