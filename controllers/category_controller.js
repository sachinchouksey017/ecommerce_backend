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
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.deleteCategory = (req, res) => {
    console.log("param is ", req.params, "      ", req.query);
    const categoryId = req.params.categoryId;
    const body = req.body;
    const errors = validationResult(req);
    if (!categoryId) {
        return res.status(400).send({
            mess: "categoryId is required field in query"
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    categoryService.deleteCategory({
        categoryId: categoryId
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.updateCategory = (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    categoryService.updateCategory({
        categoryName: body.categoryName,
        categoryId: body.categoryId
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.getAllCategory = (req, res) => {

    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    categoryService.getAllCategory().then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}