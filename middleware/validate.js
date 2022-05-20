const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "hour": "required|string",
        "minute": "required|string",
        "instructions": "required|array",
        "ingredients": "required|array",
        "equipment": "array",
        "authorName": "string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
  saveRecipe
}