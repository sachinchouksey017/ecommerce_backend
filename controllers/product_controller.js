const productService = require('../services/product_service')
const { body, validationResult } = require('express-validator');
module.exports.addProduct = (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productService.addProduct({
        productName: body.productName,
        price: body.price,
        img: body.img,
        quantity: body.quantity,
        categoryId: body.categoryId
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.deleteProduct = (req, res) => {
    console.log("param is ", req.params, "      ", req.query);
    const productId = req.query.productId;
    const body = req.body;
    const errors = validationResult(req);
    if (!productId) {
        return res.status(400).send({
            mess: "productId is required field in query"
        });
    }
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productService.deleteProduct({
        productId: productId
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.updateProduct = (req, res) => {
    const body = req.body;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productService.updateProduct({
        productName: body.productName,
        productId: body.productId,
        categoryId: body.categoryId,
        price: body.price,
        quantity: body.quantity
    }).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}

module.exports.get = (req, res) => {
    console.log("param is ", req.params, "      ", req.query);

    const queryParam = req.query;
    let body = {
        ...(queryParam.categoryName) && { categoryName: queryParam.categoryName },
        ...(queryParam.productName) && { productName: queryParam.productName }
    }
    console.log('body is ', body);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productService.getProduct(body).then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}
module.exports.sortByDate = (req, res) => {
    productService.sortByDateProduct().then(data => {
        return res.status(data.status).send(data)
    }).catch(err => {
        console.log('error after ', err.status);
        return res.status(err.status).send(err)

    })

}
