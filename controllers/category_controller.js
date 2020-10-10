const categoryService = require('../services/category_service')
const { body, validationResult } = require('express-validator');
module.exports.add = (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    categoryService.addCategory({
        categoryName: body.categoryName
    }).then(data => {
        return res.send(data).status(data.status)
    }).catch(err => {
        return res.send(err).status(err.status)

    })

}