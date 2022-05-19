const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
// const multer = require('multer');
// const upload = multer({dest: './uploads/'}); 

const getAll = async (req, res, next) => {
    const result = await mongodb.getDB().db().collection('recipe').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req,res,next) => {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDB()
    .db()
    .collection('recipe')
    .find({ _id: recipeId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};


const addOne = async (req,res,next) => {
    console.log(req.file);
    const contact = {
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
        productImage: req.file.path
    
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
    const recipeId = new ObjectId(req.params.id);
    const contact = {
        name: req.body.name,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        equipment: req.body.equipment,
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


module.exports = { getAll, getSingle, addOne, editOne, deleteOne}